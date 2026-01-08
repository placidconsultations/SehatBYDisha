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

export const handleBuyPlan = async (plan, onSuccess) => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
        toast.error('Razorpay SDK failed to load.');
        return;
    }

    try {
        // 1️⃣ Create order (ONLY send planId now)
        const { data } = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/create-order`,
            { planId: plan.id }
        );

        const { orderId, amount, keyId } = data;

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

            modal: {
                ondismiss: () => {
                    toast.info("Payment cancelled by user.");
                },
            },

            handler: async function (response) {
                try {
                    // 3️⃣ Verify payment on backend
                    const verifyRes = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/api/verify-payment`,
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }
                    );

                    if (verifyRes.data.success) {
                        // 4️⃣ Save to localStorage
                        const current = JSON.parse(localStorage.getItem("myPlans") || "[]");
                        current.push({
                            planId: plan.id,
                            planName: plan.title,
                            purchasedAt: new Date().toISOString()
                        });
                        localStorage.setItem("myPlans", JSON.stringify(current));

                        toast.success("Payment Successful!");
                        if (onSuccess) onSuccess();
                    } else {
                        toast.error("Payment verification failed");
                    }
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
        });

        paymentObject.open();

    } catch (err) {
        console.error(err);
        toast.error("Could not create order. Backend error.");
    }
};
