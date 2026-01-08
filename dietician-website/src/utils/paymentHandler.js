import axios from 'axios';
import { toast } from 'react-toastify';

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const getPlanDurationInDays = (durationString) => {
    if (!durationString) return 30; // default fallback

    const parts = durationString.split(" ");
    const value = parseInt(parts[0]);       // number
    const unit = parts[1]?.toLowerCase();   // "days" or "months"

    if (unit.includes("day")) {
        return value;
    }

    if (unit.includes("month")) {
        return value * 30;  // convert months → approx 30 days
    }

    return 30; // fallback
};


export const handleBuyPlan = async (plan, onSuccess, setPaymentLoading) => {

    try {
        // 1️⃣ Load Razorpay SDK
        setPaymentLoading(true);
        const loaded = await loadRazorpayScript();
        if (!loaded) {
            toast.error('Razorpay SDK failed to load.');
            setPaymentLoading(false);
            return;
        }

        // 1️⃣ Create order (ONLY send planId now)
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/create-order`,
            { planId: plan.id }
        );

        const { orderId, keyId } = data;

        // 2️⃣ Set payment loading to false
        setPaymentLoading(false);

        if (!orderId) {
            toast.error("Order ID not received from backend");
            return;
        }

        // 2️⃣ Razorpay Options
        const options = {
            key: keyId,
            order_id: orderId,
            name: "Sehat By Disha",
            description: `Purchase ${plan.title}`,
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2ODkwNjR8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fHwxNzY3ODkwMjU1fDA&ixlib=rb-4.1.0&q=80&w=400',

            modal: {
                ondismiss: () => {
                    toast.info("Payment cancelled by user.");
                },
            },

            handler: async function (response) {
                try {


                    // 3️⃣ Set payment loading to true
                    setPaymentLoading(true);

                    // 3️⃣ Verify payment on backend
                    const verifyRes = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/api/verify-payment`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }
                    );

                    console.log(verifyRes.data);

                    if (verifyRes.data.success) {

                        if (onSuccess) onSuccess(plan.id);
                    } else {
                        toast.error("Payment verification failed");
                    }

                    // 4️⃣ Set payment loading to false
                    setPaymentLoading(false);

                    // 4️⃣ Save to localStorage
                    const current = JSON.parse(localStorage.getItem("myPlans") || "[]");
                    const purchasedAt = new Date();

                    const durationDays = getPlanDurationInDays(plan.duration);  // 👈 convert string to days

                    const expiresAt = new Date(
                        purchasedAt.getTime() + durationDays * 24 * 60 * 60 * 1000
                    );

                    current.push({
                        planId: plan.id,
                        planName: plan.title,
                        purchasedAt: purchasedAt.toISOString(),
                        expiresAt: expiresAt.toISOString(),
                    });

                    localStorage.setItem("myPlans", JSON.stringify(current));

                    toast.success("Payment Successful!");

                } catch (err) {
                    console.error(err);
                    toast.error("Payment verification error");
                }
            },

            theme: {
                color: "#10B981",
            },
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed", function (response) {
            toast.error("Payment Failed: " + response.error.description);
            // 5️⃣ Set payment loading to false
            setPaymentLoading(false);
        });

        paymentObject.open();

    } catch (err) {
        console.error(err);
        setPaymentLoading(false);
        toast.error("Could not create order. Backend error.");
    }
};
