
import Types from "@/app/backend/db/types";
import connectDb from "@/app/backend/db/db";
export async function GET (req) {
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    console.log(id)
    try {
        // connect db
        await connectDb()
        // find db
          const data = await Types.find({
            category:id
          })
          
          return Response.json({
            success:true,
            response:data
          })
        
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            message:error.message
        },{
            status:500
        }
    )
    }
}