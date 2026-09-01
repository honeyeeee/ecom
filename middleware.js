
import { NextResponse } from "next/server";


import {jwtVerify} from 'jose'

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const cookie = request.cookies.get('token')?.value
    const isAdmine = pathname.startsWith("/frontend/admin")
const isUser = pathname.startsWith("/client_side")
    if( (isAdmine || isUser) &&  !cookie){
        return NextResponse.json({
            message:'token not avilable',
            status:401
        })
    }

if(cookie){


    try {


        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const {payload} =await jwtVerify(cookie,secret)
        const userRole = payload.role;

        if(isAdmine && userRole !=='admin'){
            return NextResponse.json({
                message:'you are not authorise to access content'
            })
        }

       
    } catch (error) {
    const response = NextResponse.json({
        message:'something went wrong',

    })
response.cookies.delete('token')
return response

    }
}

return NextResponse .next()
}

export const config = {
  matcher: ["/frontend/admin/:path*",
            "/client_side/:path*",
  ],
}