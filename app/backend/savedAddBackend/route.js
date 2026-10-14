import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../cart/auth";
import connectDb from "../db/db";
// import Address from "@/models/address";
import Address from "../db/addressScema";
export async function GET(request) {

    await connectDb();
    const user = await getAuthenticatedUser();
    console.log('user in savedAddBackend',user)
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 ,continue:false});
    }

    // find address for user
    const addres = await Address.find({user:user.user._id})
    console.log('addres in savedAddBackend',addres)
    if(!addres){
        return NextResponse.json({ message: "No addresses found", data:null,success:false });
    }
    
 return NextResponse.json({ message: "Saved addresses fetched successfully", data:addres,success:true });
}