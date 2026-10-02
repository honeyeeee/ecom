import { Db } from "@/app/backend/db/db";
import Ocassion from "@/app/backend/db/occasion";
import connectDb from "@/app/backend/db/db";
export async function GET(params) {
    try {
        await connectDb()
        const data = await Ocassion.find()
        // const response = await data.json()
        return Response.json({
            success:true,
            response:data
        })
    } catch (error) {
        console.log(error)
        return Response.json({
            message:error.message
        })
    }
    
}