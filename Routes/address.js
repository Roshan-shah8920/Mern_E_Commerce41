import express from "express"
import { addAddress, getAddress } from "../Controllers/address.js";

const router = express.Router()

router.post("/add",addAddress)

//get Address
router.get("/get",getAddress)


export default router;