import mongoose from "mongoose";

const  cart = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        default:1
    }
})

cart.index(
    {
        userId:1,productId:1
    },
    {
        unique:true
    }
)

const Cart = mongoose.models.Cart || mongoose.model('Cart',cart)
export default Cart