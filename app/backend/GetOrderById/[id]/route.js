import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/app/backend/cart/auth";
import Orders from "@/app/backend/db/ordersSchema";
import connectDb from "@/app/backend/db/db";

export async function GET(request, { params }) {
    try {
        await connectDb();

        const user = await getAuthenticatedUser();
        if (!user?.user) {
            return NextResponse.json(
                { error: "Unauthorized", orderFound: false },
                { status: 401 }
            );
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: "Order ID is required", orderFound: false },
                { status: 400 }
            );
        }

        const order = await Orders.findOne({
            _id: id,
            user: user.user._id,
        });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found", orderFound: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { order, orderFound: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: error.message, orderFound: false },
            { status: 500 }
        );
    }
}
