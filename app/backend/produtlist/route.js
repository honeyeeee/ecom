import Product from "../db/oldproduct"
import Category from "../db/catergory"
import SubCategory from "../db/subCategory"
import Types from "../db/types"
import Prod from "../db/productSchema"
import connectDb from "../db/db"
import { jwtVerify } from "jose"


export async function GET(request) {
console.log('ye hai request from product list',request)
const {searchParams} = new URL(request.url)
const cat = searchParams.get('category')
console.log('ye hai url from server',cat)
    try {
        const cooks = request.headers.get('cookie')
// console.log( cooks)

const token = cooks
    ?.split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];

    console.log(token)
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} =  await jwtVerify(token || cooks,secret)
        const userRoel = payload.role
        console.log(userRoel)
        if(userRoel ==='admin'){
await  connectDb()
console.log(cat)

// tow section find first categgory then onthe bases or cat id we find product 
if(cat){
    const data = await SubCategory.findOne({
        name:cat  //cat for category
    })
  console.log('kya ye avilable hai ',data)

  const find = await Prod.find({
    productType:data._id
  }).populate('category')
    .populate('productType')
    .populate('productCategory')

  return Response.json({
   success:true,
        ans:find
  })
}
    const data = await Prod.find()
    .populate('category')
    .populate('productType')
    .populate('productCategory')

    console.log('data from db ',data)

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