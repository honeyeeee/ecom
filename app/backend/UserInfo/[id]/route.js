import User from "../../db/userSchema";
import connectDb from "../../db/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Prod from "../../db/productSchema";

export async function POST(request, { params }) {

    try {
        // ----- 1. DATABASE CONNECT -----
        // pehle db connect, warna user/product find fail ho sakta hai
        await connectDb();

        // ----- 2. FRONTEND BODY -----
        // Buy Now se color, size, quantity aata hai
        const body = await request.json()
        console.log('ye hai body', body)
        const { color, size, quantity } = body.product

        // ----- 3. SIZE / QUANTITY NORMALIZE -----
        // size kabhi "M" aata hai, kabhi { size: "M", stock: 5 }
        // quantity na ho to default 1
        let sizeValue = size
        if (size && typeof size === 'object') {
            sizeValue = size.size
        }

        let qty = quantity
        if (!qty) {
            qty = 1
        }

        // ----- 4. URL SE PRODUCT ID -----
        // /backend/UserInfo/[id]  ->  yeh id PRODUCT ki hai, user ki nahi
        const { id } = await params
        console.log('ye hai product id url se', id)

        // ----- 5. COOKIE SE USER -----
        // token cookie me hai, jwt se user id nikal ke User collection me find
        const cookieStore = await cookies();
        const session = cookieStore.get('token')?.value
        console.log(session)
        if (!session) {
            return Response.json(
                {
                    success: false,
                    message: 'Please log in'
                },
                { status: 404 }
            );
        }
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)

        const verify = await jwtVerify(session, secret)
        console.log('payload dekh bhai', verify)
        const UserId = verify.payload.id
        const user = await User.findById(UserId)
        console.log(user)

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: 'User not found'
                },
                { status: 404 }
            );
        }

        // ----- 6. PRODUCT FIND -----
        // url wali id se Prod collection me product dhoondo
        const product = await Prod.findById(id)
        console.log('ye hai product', product)

        if (!product) {
            return Response.json(
                {
                    success: false,
                    message: 'Product not found'
                },
                { status: 404 }
            );
        }

        // ----- 7. COLOR CHECK -----
        // product.variants me frontend wala color match karo
        const variant = product.variants.find((v) => v.color === color)
        console.log('ye hai variant', variant)

        if (!variant) {
            return Response.json(
                {
                    success: false,
                    message: 'Color not found'
                },
                { status: 404 }
            );
        }

        // ----- 8. SIZE CHECK -----
        // us color ke sizes array me size dhoondo
        const sizeStock = variant.sizes.find((s) => s.size === sizeValue)
        console.log('ye hai size stock', sizeStock)

        if (!sizeStock) {
            return Response.json(
                {
                    success: false,
                    message: 'Size not found'
                },
                { status: 404 }
            );
        }

        // ----- 9. STOCK CHECK -----
        // db wala stock requested qty se kam ho to order mat jane do
        if (sizeStock.stock < qty) {
            return Response.json(
                {
                    success: false,
                    message: 'Stock not enough',
                    stock: sizeStock.stock
                },
                { status: 400 }
            );
        }

        // ----- 10. SUCCESS -----
        // user + product db se confirm, abhi order save / stock minus nahi
        return Response.json(
            {
                success: true,
                user: user,
                product: {
                    id: product._id,
                    name: product.name,
                    color: variant.color,
                    size: sizeStock.size,
                    stock: sizeStock.stock,
                    quantity: qty
                }
            },
            { status: 200 }
        );

    } catch (error) {
        // ----- 11. ERROR -----
        console.error("Error fetching user:", error.message);
        return Response.json(
            {
                success: false,
                message: 'User not available',
                error: error.message
            },
            { status: 500 }
        );
    }
}
