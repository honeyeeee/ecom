import Category from "../../db/catergory"

import connectDb from "../../db/db"
export async function POST(request) {
    
    try {
        await connectDb()
          const body = await request.json()
    const build = await Category.create({
        name:body.name
    })

    return Response.json({
        success:true,
        build
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:'category not created'
        })
    }
  
}