import { Db } from "../../db/db"
import Types from "../../db/types"
import connectDb from "../../db/db"
export async function POST(request){
const body = await request.json()
try {
    // db connect
await connectDb()
// db create
const data = await Types.create({
name:body.name,
category:body.category
})

return Response.json({
    success:true,
    message:'your data has been posted'
})


} catch (error) {
    console.log(error)  
    return Response.json({
        message:'your product type is not submited'
    })
}

}