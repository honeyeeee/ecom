import SubCategory from "../../db/subCategory"


import connectDb from "../../db/db"
export async function POST(request) {
    try {
        await connectDb()
          const body = await request.json()
    const build = await SubCategory.create({
        name:body.name,
        category:body.category
    })

    return Response.json({
        success:true,
        build
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:'Subcategory not created'
        })
    }
  
}