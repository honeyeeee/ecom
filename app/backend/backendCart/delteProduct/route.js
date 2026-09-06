
import { jwtVerify } from "jose"
import User from "../../db/userSchema"
import Cart from "../../db/cart"
import Product from "../../db/productSchema"
export async function DELETE(request){
const cookei = request.headers.get('cookie')
console.log('cookie mili kya ',  cookei)
const token = cookei.split("=")[1]

// console.log('lele id leel', cartId)

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const check = await jwtVerify(token,secret)

// identify user 
const userId = check.payload.id
const user = await User.findById(userId,{
    _id:1
})


if(!user){
    console.log('user is not avilable')
    return Response.json({
        success:false,
        status:500
    })
}
console.log('this is a user ', user)

// cart id verify
const body =  await request.json()
console.log(body)
const cartId = body.id
console.log(cartId)


const findProduct = await Cart.findById(cartId,{
    _id:1,
    userId:1
})

if(!findProduct){
    console.log('product is not avilable ')
    return Response.json({
        message:'unavilable products',
        status:500
    })
}
console.log('ye hai bhai product ',findProduct)

// find user & product in the cart 
if(user._id.equals(findProduct.userId)){
    console.log('this can be dilitable')
const cartId = findProduct._id



async function remeove(params) {
    try {
        const del = await Cart.findByIdAndDelete(cartId)
        
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
 return await remeove()
}

}