import { Db } from "@/app/backend/db/db";
import Proto from "@/app/backend/db/proto";

export async function POST(req) {
  try {
    const body = await req.json();

    await Db();

    const data = await Proto.create({
      name: body.name,
      category: body.category,
      price: body.price
    });

    return Response.json({
      message: "data created successfully",
      response: data
    });

  } catch (error) {
    return Response.json({
      message: "not created",
      response: error.message
    });
  }
}