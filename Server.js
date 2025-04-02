import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import paymentRouter from "./Routes/payment.js  "
import cors from "cors"


const app = express();
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(express.json());
const port = 5000;

// server start
app.listen(port,()=>console.log(`Server running on port${port}`))

//mongoose setup
mongoose.connect("mongodb+srv://rs20150190128:igLWtRsKTr7HMIps@cluster0.pf3j7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log("MongoDB Connected")).catch((err)=>console.log(err))

//add new ProductRouter
app.use("/api/product",productRouter)

//cart Router
app.use("/api/cart",cartRouter)

//address
app.use("/api/address",addressRouter)

//payment Router
app.use("/api/payment",paymentRouter)


app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("Backend is running...")
})





//mongoose = mongodb+srv://rs20150190128:igLWtRsKTr7HMIps@cluster0.pf3j7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0