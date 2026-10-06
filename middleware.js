
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const cookie = request.cookies.get("token")?.value;

    const isAdminRoute = pathname.startsWith("/frontend/admin");
    const isAddressRoute = pathname.startsWith("/client_side/orderPage/address");

    // 1️⃣ Agar Admin ya Address page par token NAHI hai -> Login par redirect karein
    if ((isAdminRoute || isAddressRoute) && !cookie) {
        return NextResponse.redirect(new URL("/frontend/Login", request.url));
    }

    // 2️⃣ Agar Token hai toh verify karein
    if (cookie) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(cookie, secret);
            const userRole = payload.role;

            // Sirf Admin panel ke liye check: role 'admin' hona zaroori hai
            if (isAdminRoute && userRole !== "admin") {
                return NextResponse.json({
                    message: "You are not authorized to access content",
                    status: 403,
                });
            }
        } catch (error) {
            // Agar token genuinely corrupt/expired hai tabhi delete karein aur login bhein
            const response = NextResponse.redirect(new URL("/frontend/Login", request.url));
            response.cookies.delete("token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/frontend/admin/:path*",
        "/client_side/orderPage/address/:path*",
    ],
};