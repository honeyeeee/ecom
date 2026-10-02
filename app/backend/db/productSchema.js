import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true

    },
    productType:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory',
        required:true
    },
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Types',
        required:true
    },
      occasion:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"Occasion",
        // required:true

    },
    // price :Number,
    variants:[{
        color:{
            type:String,
            required:true
        },
        sizes:[
            {
            size:{
            type:String,
             enum: ["S", "M", "L", "XL",'2XL','3XL','4XL'],
             required:true
        },
             stock:{
                type:Number,
                min:0,
                default:0,
             }

            }
          

    
    ],
        image:[{
            id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }]
    }]
})

const Prod = mongoose.models.Prod ||  mongoose.model("Prod", productSchema);
export default Prod