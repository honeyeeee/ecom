import mongoose from "mongoose";
import { array } from "zod";
const ordersSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Prod",
        required:true,
    },
    mainProduct:{
        type:[],
        required:true,
    },
    userAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:["pending", "processing", "shipped", "delivered", "cancelled","return" ,"refunded"],
        default:"pending",
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
}, { timestamps: true })

const Orders = mongoose.models.Orders || mongoose.model("Orders", ordersSchema)
export default Orders
