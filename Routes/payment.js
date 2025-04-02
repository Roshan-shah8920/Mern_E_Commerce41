import express from "express"
import { checkout, userOrder, verify } from "../Controllers/payment.js"

const router = express.Router()

//checkout
router.post("/checkout",checkout)

//verify
router.post("/verify-payment",verify)  

//user
router.get("/userorder",userOrder)

// all order
router.get("/orders",userOrder)

export default router