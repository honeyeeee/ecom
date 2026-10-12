import connectDb from "../../db/db";
import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "../auth";
import Cart from "../../db/cart";


export async function GET() {
  try {
    await connectDb();
    const auth = await getAuthenticatedUser();
    if (auth.error) return auth.error;

    const cartProducts = await Cart.find({ userId: auth.user._id })
      .populate(
        "productId",
        "name basePrice variants  Image Name Price"
      )
      .lean();

    return NextResponse.json({ success: true, cart: cartProducts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
