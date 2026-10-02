import SubCategory from "@/app/backend/db/subCategory"

// import { Db } from "@/app/backend/db/db"
import connectDb from "@/app/backend/db/db"
export async function GET(request) {
    try {
        await connectDb()
        console.log(request)
       const { searchParams } = new URL(request.url)
       
        console.log('ye hia bhai search para',searchParams)
        const id = searchParams.get("id")
        
        console.log(id)
       
    const build = await SubCategory.find({
        category:id
    })
console.log( 'ye data hai backend se', build)

    return Response.json({
        success:true,
        ans : build
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:'Subcategory not created'
        })
    }
  
}