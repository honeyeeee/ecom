import Product from "../../db/productSchema"
import connectDb from "../../db/db"
export async function GET(request,{params}) {
   await connectDb()
    console.log('id is avilable')
    try {
        
    const {id} = await params
    // console.log(id)

    if(!id){
        console.log('no id avilabel')
    }
    console.log('response tak pahuchgaya')


    const response = await Product.findById(id)
    
    return Response.json({
        status:true,
        ans : response
    })
    } catch (error) {
        console.log(error)
        return Response.json({
            success:false,
            error :error
        })
    }


}