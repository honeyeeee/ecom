import mongoose  from "mongoose";
const typesSchema= new mongoose.Schema({
    name:{
        type: String,
        unique:true,
        required:true 
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
})

const Types=mongoose.models.Types || mongoose.model('Types',typesSchema)
export default Types