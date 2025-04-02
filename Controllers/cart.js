import { Cart } from "../Models/Cart.js";


//addToCart
export const addToCart = async (req,res) => {
    const {productId,title, price,qty,imgSrc} = req.body
    const userId = "67e2974b4103711f0bcf0f21"
    const cart = await Cart.findOne({userId})
    if (!cart) {
        const cart = new Cart({userId,items:[]})
    }

    const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId)

    if (itemIndex > -1) {
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].price += price*qty
    }else{
        cart.items.push({productId,title, price,qty,imgSrc})
    }
    await cart.save();
    res.json({message:"Cart Successfully Add!...!",cart})
}

//user specific car
export const userCart = async (req,res) => {
    const userId = "67e2974b4103711f0bcf0f21"
    const cart = await Cart.find({userId});
    if (!cart) {
        return res.json({message:"cart not found"})
    }
    res.json({message:"user cart",cart})
}

//cartItems delete by id
export const removeProductFromCart = async (req,res) =>{
    const productId = req.params.productId;
    const userId = "67e2974b4103711f0bcf0f21"
    const cart = await Cart.findOne({userId})
    if (!cart) {
        return res.json({message:"Cart Not Found"})
    }
    cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)
    await cart.save()
    res.json({message:"Product is remove successfully..!",cart})
}

//delete all product by cart
export const clearCart = async (req,res) => {
    const userId = "67e2974b4103711f0bcf0f21"
    const cart = await Cart.findOne({userId})
    if (!cart) {
        cart = new Cart({items:[]})
    }
    else{
        cart.items = [];
    }
    await cart.save();
    res.json({message:"clear cart ..!"})
}
    

//decQtyToCart
export const decreaseProductQty = async (req,res) => {
    const {productId,qty} = req.body
    const userId = "67e2974b4103711f0bcf0f21"
    const cart = await Cart.findOne({userId})
    if (!cart) {
        const cart = new Cart({userId,items:[]})
    }

    const itemIndex = cart.items.findIndex((item)=>item.productId.toString()===productId)

    if (itemIndex > -1) {
        const item = cart.items[itemIndex]
        if (item.qty > qty) {
            const pricePerUnit = item.price/item.qty

            item.qty -= qty
            item.price -= pricePerUnit
        }else{
            cart.items.splice(itemIndex,1)
        }

    }else{
        return res.json({message:"invalid Product"})
    }
    await cart.save();
    res.json({message:"Item Remove SuccessFully ...!",cart})
}