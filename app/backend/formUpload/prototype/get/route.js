
import { Db } from "@/app/backend/db/db";
import Proto from "@/app/backend/db/proto";
export async function GET(params) {
    try {
        await Db()
        const find = await Proto.find()
        return Response.json({
            message:'this is your data boy',
            response:find
        })
    } catch (error) {
        console.log(error.message)
        return Response.json({
            message:'something went wrong',
            response:error.message
        })
    }
    
}