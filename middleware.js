import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
export default function middleware(req){
    try {
        
    const cookie = req.cookies.get('token')?.value

    if (!cookie){
        return Response.json({
            message:'token not avilable bro'
        })
    }

    const varify = jwt.verify(cookie,process.env.JWT_SECRET)
    return NextResponse.next();
    
    } catch (error) {
        return Response.json({
            success:false,
            message:'temperd token '
        })
    }
    
}