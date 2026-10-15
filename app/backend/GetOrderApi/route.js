
import { getAuthenticatedUser } from "../cart/auth";
import { NextResponse } from "next/server";
import Prod from "../db/productSchema";
import Address from "../db/addressScema";
import Orders from "../db/ordersSchema";
import connectDb from "../db/db";
export async function GET(request, { params }) {
    try {
        await connectDb()
        const user = await getAuthenticatedUser()
        if(!user)
            {return NextResponse.json({ error: "Unauthorized" }, { status: 401 },{user:false})
        }


        const orders = await Orders.find({ user: user.user._id })
        // console.log( "orders", orders)

         if(!orders){
         return NextResponse.json({ error: "No orders found" }, { status: 404 },{ordersFound:false})
        }
        return NextResponse.json({orders:orders,ordersFound:true})
        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 },{ordersFound:false})
    }
  
}
