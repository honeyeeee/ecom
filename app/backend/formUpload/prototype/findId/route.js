import { Db } from "@/app/backend/db/db"

import Proto from "@/app/backend/db/proto"

export async function GET(req) {
  try {
    await Db()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    const data = await Proto.findById(id)

    return Response.json({
      message: "data found",
      response: data
    })

  } catch (error) {
    return Response.json({
      message: "something went wrong",
      response: error.message
    })
  }
}