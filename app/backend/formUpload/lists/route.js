
import Product from "../../db/productSchema"

import Category from "../../db/catergory"
import SubCategory from "../../db/subCategory"

import connectDb from "../../db/db"
export async function GET(params) {
    try {
       await connectDb()
         const response = await Product.find()
    .populate('category')
    .populate('subcategory')
    
    return Response.json({
        success:true,
        ans:response
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:'query not foun'
        })
    }
   
}