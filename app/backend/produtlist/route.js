import Product from "../db/productSchema"
import connectDb from "../db/db"
export async function GET(request) {
    try {
      await  connectDb()
    const data = await Product.find()
    console.log('data from db ',data)

    return Response.json({
        success:true,
        ans:data,
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            error
        })
    }
    
}