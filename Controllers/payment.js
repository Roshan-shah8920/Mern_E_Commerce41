import Stripe from "stripe";
import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to paisa
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount : amount,
      cartItems,
      userShipping,
      userId,
      payStatus: "created",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Payment Verification Route
export const verify = async (req, res) => {
  const { paymentIntentId, amount, orderItems, userId, userShipping } = req.body;

  let orderConfirm = await Payment.create({
    orderId: paymentIntentId,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "Payment successful!", success: true, orderConfirm });
};

// ✅ User Specific Orders
export const userOrder = async (req, res) => {
  const { userId } = req.body;  // Receiving userId from frontend request
  
  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const orders = await Payment.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};


// ✅ All Orders (Admin)
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ createdAt: -1 });
  res.json(orders);
};  
