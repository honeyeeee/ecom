import Cart from "../../db/cart";
import { jwtVerify } from "jose";

import User from "../../db/userSchema";
import Product from "../../db/productSchema";
// auth addition remaning

export async function POST(request) {

    const token = request.headers.get('cookie').split('=')[1]
// console.log(token)

const verfy = new TextEncoder().encode(process.env.JWT_SECRET)
const {payload}= await jwtVerify (token,verfy)
// console.log(payload)
const user = payload.id
const findUser = await User.findById(user,{
    _id:1
})
// console.log(findUser)
const body = await request.json()

const findProduct = await Product.findById(body.productId,{
    _id:1
})
// console.log(findProduct)


const checkDuplicate = await Cart.findOne(
    {
        $and:[
            {userId:findUser._id},
            {productId:findProduct._id}
        ]
    }
)

console.log(checkDuplicate)


if(checkDuplicate){
    checkDuplicate.quantity +=1,
    await checkDuplicate.save()
}
else{

    const create = await Cart.create({
        userId:findUser._id,
        productId:findProduct._id,
        quantity:body.quantity
    })
}

    return Response.json ({
        success:true,
        message:'your data is created'
    })
}
