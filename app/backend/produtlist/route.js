import Product from "../db/productSchema"
import connectDb from "../db/db"
import { jwtVerify } from "jose"
export async function GET(request) {

    try {
        // console.log('this is form productlist',request)
        // console.log('cookie hai kya ' ,request.headers.get('cookie'))
        const cooks = request.headers.get('cookie')
console.log(cooks)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} =  await jwtVerify(cooks,secret)
        const userRoel = payload.role
        console.log(userRoel)
        if(userRoel ==='user'){
await  connectDb()
    const data = await Product.find()
    // console.log('data from db ',data)

    return Response.json({
        success:true,
        ans:data,
    })
        }
else{
    console.log('this is not an admin')
    return Response.json({
        success:false,
        message:'this is not an admin'
    })
}
      
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            error
        })
    }
    
}