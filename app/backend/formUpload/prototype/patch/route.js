
import Proto from "@/app/backend/db/proto";

export async function PATCH(req) {
    try {
        
        console.log(req)
        const {searchParams} = new URL(req.url)
        const id = searchParams.get('id')
        const body = await req.json()
    
        const  update = await Proto.findByIdAndUpdate(id,body,{new:true})
        
        return Response.json({
            message:'product updated successfully',
            response:update
        })
    } catch (error) {
        console.log(error.message)
        return Response.json({
            message:'product not updated',
            response:null
        })
    }

    
}