import User from "../db/userSchema";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { error: NextResponse.json({ success: false, message: "Please log in" }, { status: 401 }) };
  }

  if (!process.env.JWT_SECRET) {
    return { error: NextResponse.json({ success: false, message: "Server misconfigured" }, { status: 500 }) };
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const user = await User.findById(payload.id);

    if (!user) {
      return { error: NextResponse.json({ success: false, message: "User not found" }, { status: 404 }) };
    }

    return { user };
  } catch {
    return { error: NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 }) };
  }
}
