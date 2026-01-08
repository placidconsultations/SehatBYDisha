import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Razorpay from "razorpay";
import crypto from "crypto";
import admin from "firebase-admin";

// Initialize Firebase Admin using service account JSON
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors({
    origin:"*"

}));
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/*****************************************
 * 1️⃣ CREATE ORDER (SECURE)
 *****************************************/
app.post("/api/create-order", async (req, res) => {
  try {
    const { planId } = req.body;

    if (!planId) return res.status(400).json({ msg: "planId is required" });

    // Fetch real plan data from Firestore
    const planSnap = await db.collection("plans").doc(planId).get();
    if (!planSnap.exists) return res.status(404).json({ msg: "Plan not found" });

    const plan = planSnap.data();
    const amount = plan.price;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${planId}`,
    });

    // Save order temporarily
    await db.collection("orders").doc(order.id).set({
      planId,
      amount,
      status: "created",
      createdAt: new Date(),
    });

    res.json({
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: "INR",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*****************************************
 * 2️⃣ VERIFY PAYMENT
 *****************************************/
app.post("/api/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, msg: "Invalid signature" });
    }

    const orderSnap = await db.collection("orders").doc(razorpay_order_id).get();
    if (!orderSnap.exists) return res.status(404).json({ msg: "Order not found" });

    const order = orderSnap.data();

    // Save successful payment
    await db.collection("payments").doc(razorpay_payment_id).set({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      planId: order.planId,
      amount: order.amount,
      status: "success",
      purchasedAt: new Date(),
    });

    await db.collection("orders").doc(razorpay_order_id).update({ status: "paid" });

    res.json({ success: true, msg: "Payment verified" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

/*****************************************
 * Start server (Render requirement)
 *****************************************/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
