import mongoose from "mongoose";
const OccasionSchema = new mongoose.Schema({
    occasion:{
        type:String,
        required:true,
        unique:true
    }
})
const Ocassion= mongoose.models.Ocassion || mongoose.model('Ocassion',OccasionSchema)
export default Ocassion