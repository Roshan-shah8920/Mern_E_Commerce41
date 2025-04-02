import express from "express"
import { addToCart } from "../Controllers/cart.js   ";
import { clearCart, decreaseProductQty, removeProductFromCart, userCart } from "../Controllers/cart.js";

const route = express.Router()

//add To cart
route.post("/add",addToCart)

//user cart
route.get("/user",userCart)

//delete
route.delete("/remove/:productId",removeProductFromCart)

//clear cart
route.delete("/clear",clearCart)

//dec
route.post("/--qty",decreaseProductQty)

export default route;