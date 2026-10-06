// Archive copy — restore as app/backend/backendCart/addToCart/route.js
import connectDb from "../../db/db";
import Cart from "../../db/cart";
import { jwtVerify } from "jose";
import User from "../../db/userSchema";
import Prod from "../../db/productSchema";

export async function POST(request) {
    try {
        await connectDb();
        
    const token = request.headers.get('cookie').split('=')[1]

const verfy = new TextEncoder().encode(process.env.JWT_SECRET)
if(!verfy){
    return Response.json({
        message:'you are not a real user bro',
        status :409
    })
}
const {payload}= await jwtVerify (token,verfy)
const user = payload.id
const findUser = await User.findById(user,{
    _id:1
})

const body = await request.json()

const findProduct = await Prod.findById(body.productId,{
    _id:1
})

if(!findUser || !findProduct){
    return Response.json({
        message:'you are a lyer buddy',
        status:409
        
    })
}

const checkDuplicate = await Cart.findOne(
    {
        $and:[
            {userId:findUser._id},
            {productId:findProduct._id}
        ]
    }
)

if(checkDuplicate){
    checkDuplicate.quantity +=1,
    await checkDuplicate.save()
}
else{

    await Cart.create({
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
