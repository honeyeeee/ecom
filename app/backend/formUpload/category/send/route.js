import Category from "@/app/backend/db/catergory"

import connectDb from "@/app/backend/db/db"
export async function GET(request) {
    
    try {
        await connectDb()
        //   const body = await request.json()
        const data = await Category.find()
 

    return Response.json({
        success:true,
        response:data
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:'category not created'
        })
    }
  
}