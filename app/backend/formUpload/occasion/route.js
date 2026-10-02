import Ocassion from "../../db/occasion"
import { Db } from "../../db/db"
import connectDb from "../../db/db"
export async function POST(req) {
    try {
        await connectDb()
         const body = await req.json()
    const data = await Ocassion.create({
        occasion:body.name
    })
    return Response.json({
        success:true,
        message:'occasion fullfiled'
    })
    } catch (error) {
        console.log(error)
          return Response.json({
            success:false,
            message:'occasion not created'
          })
    }
   

}