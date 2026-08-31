import mongoose from "mongoose";

export default async function connectDb() {
    console.log('connected db')
    await mongoose.connect(process.env.MONGODB_URI)
}
 

