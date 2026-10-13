
import connectDb from "../db/db";
import Address from "../db/addressScema";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../cart/auth";
export async function POST(request) {
    
    try {
        await connectDb();
        const auth = await getAuthenticatedUser();
        if (auth.error) return auth.error;

        const body = await request.json();
        const { address, city, state, postalCode, country, phone, email, name } = body;
        
        console.log('ye hai body',body)
        if(!address || !city || !state || !postalCode || !country || !phone || !email || !name) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const userId = auth.user._id;

        const existingAddress = await Address.findOne({ user: userId }, { _id: 1 });
        if(existingAddress) {
            return NextResponse.json({ error: "Address already exists" }, { status: 400 });
        }

        const newAddress = await Address.create({
            ...body,
            user: userId,
        });

        return NextResponse.json({ message: "Address created successfully" }, { status: 201 },{success:true});

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 },{success:false});
    }

}