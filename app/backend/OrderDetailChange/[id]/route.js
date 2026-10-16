import { NextResponse } from "next/server";
import Orders from "@/app/backend/db/ordersSchema";
import connectDb from "@/app/backend/db/db";


import { getAuthenticatedUser } from "@/app/backend/cart/auth";

export async function PATCH (request,{params}){
    try {
        await connectDb();  
         const user = await getAuthenticatedUser();
    if(!user){
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 } ,{user:false});
    }
    const body = await request.json();
    console.log(body);

    const {status} = body;
    console.log(params);
    const {id} = await params;
    if(!id){
        return NextResponse.json({ error: "Order ID is required" }, { status: 400 } ,{product:false});
    }

    const findOrder  = await Orders.findOneAndUpdate({_id:id, user:user.user._id}, {status:status}, {new:true});
    if(!findOrder){
        return NextResponse.json({ error: "Order not found" }, { status: 404 } ,{product:false});
    }
    return NextResponse.json({ message: "Order updated successfully" }, { status: 200 } ,{product:true});
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 } ,{product:false});
    }
   
}
