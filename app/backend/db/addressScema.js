import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{

        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    postalCode:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{ 
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
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
})
const Address= mongoose.models.Address || mongoose.model("Address",addressSchema);
export default Address;