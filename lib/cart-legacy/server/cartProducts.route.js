// Archive copy — restore as app/backend/backendCart/cartProducts/route.js
import connectDb from "../../db/db";
import Cart from "../../db/cart";
import User from "../../db/userSchema";
import { jwtVerify } from "jose";

export async function GET(request){
    try {
        await connectDb();
        const cookie = request.headers.get('cookie');
        if (!cookie) {
            return Response.json({ message: 'No cookie found', products: [], status: 401 });
        }
        const token = cookie.split("=")[1];

        const verify = new TextEncoder().encode(process.env.JWT_SECRET);
        const {payload} = await jwtVerify(token, verify);

        const user = payload.id;
        const findUser = await User.findById(user, { _id: 1 });

        if (!findUser){
            return Response.json({
                message:'you are not a real user bro ',
                products:[],
                status:200
            });
        }

        const cartProducts = await Cart.find({userId:findUser._id}).populate('productId', 'name basePrice variants description');

        if (cartProducts.length === 0){
            return Response.json({
                message:'your cart is empty',
                products: [],
                status: 200
            });
        }

        return Response.json({
            message:'your cart products',
            status: 200,
            products: cartProducts
        });
    } catch (error) {
        console.log(error)
        return Response.json({
            message:'your cart is not avilable',
            status:402
        })
    }

}
