import Cart from "../../db/cart";
import { jwtVerify } from "jose";

import User from "../../db/userSchema";
import Product from "../../db/productSchema";
// auth addition remaning

export async function POST(request) {

    try {
        
    const token = request.headers.get('cookie').split('=')[1]
// console.log(token)

const verfy = new TextEncoder().encode(process.env.JWT_SECRET)
if(!verfy){
    return Response.json({
        message:'you are not a real user bro',
        status :409
    })
}
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

if(!findUser || !findProduct){
    return Response.json({
        message:'you are a lyer buddy',
        status:409
        
    })
}

// find existing item Increase
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
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            status:500
        })
    }
}
