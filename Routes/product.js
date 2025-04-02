import express from "express"
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from "../Controllers/product.js"

const router = express.Router()

//Add to product
router.post("/add",addProduct)

//get All Product 
router.get("/all",getProduct)

//get ProductBy id
router.get("/:id",getProductById)

//get Update product
router.put("/:id",updateProductById)

//delete
router.delete("/:id",deleteProductById)

export default router