import { Products } from "../Models/Product.js";

//add a new product
export const addProduct = async (req, res) => {
    const {title, description, price, category, qty, imgSrc } = req.body;
    try {
        const product = await Products.create({ title, description, price, category, qty, imgSrc })
        res.json({message:"Product Add Successfully...!",product})
    } catch (error) {
        res.json({message:"error"})
    }
}

//get all product
export const getProduct = async (req,res) => {
    try {
        const products = await Products.find().sort({createdAt:-1})
        res.json({message:"All Product get Successfully",products})
    } catch (error) {
        console.error("Error fetching products:", error.message);
        
    }
}

//Product id 
export const getProductById = async (req,res) => {
    const id = req.params.id
    try {
        const product = await Products.findById(id)
        if (!product) {
            return res.json({message:"Invalid Id"})
        }
        res.json({message:"Specific product",product})
    } catch (error) {
        res.json(error)
    }
}

//update porduct
export const updateProductById = async (req,res) => {
    const id = req.params.id;
    try {
        const product = await Products.findByIdAndUpdate(id,req.body,{new:true})
        if (!product) {
            return res.json({message:"Invalid Id"})
        }
        res.json({message:"Update successfull product ...!",product})
    } catch (error) {
        res.json(error)
    }
}

//delete by product 
export const deleteProductById = async (req,res) => {
    const id = req.params.id;
    try {
        const product = await Products.findByIdAndDelete(id)
        if (!product) {
            return res.json({message:"Invalid Id"})
        }
        res.json({message:"Delete successfull product ...!",product})
    } catch (error) {
        res.json(error)
    }
}