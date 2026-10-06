// Archive copy — restore as app/backend/backendCart/delteProduct/route.js
import connectDb from "../../db/db";
import { jwtVerify } from "jose";
import User from "../../db/userSchema";
import Cart from "../../db/cart";

export async function DELETE(request){
    await connectDb();
    const cookei = request.headers.get('cookie');
    if (!cookei) {
        return Response.json({ success: false, message: "Unauthorized", status: 401 });
    }
    const token = cookei.split("=")[1];

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const check = await jwtVerify(token,secret)

const userId = check.payload.id
const user = await User.findById(userId,{
    _id:1
})

if(!user){
    return Response.json({
        success:false,
        status:500
    })
}

const body =  await request.json()
const cartId = body.id

const findProduct = await Cart.findById(cartId,{
    _id:1,
    userId:1
})

if(!findProduct){
    return Response.json({
        message:'unavilable products',
        status:500
    })
}

if(user._id.equals(findProduct.userId)){
const lineId = findProduct._id

    try {
        const del = await Cart.findByIdAndDelete(lineId)
        
        if (!del) {
            return Response.json({
                success: false,
                message: "Product could not be deleted"
            });
        }

         return Response.json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:"this product cant be deleted"
        })
    }
}

}
