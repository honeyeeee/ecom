import Product from "../../db/productSchema"
import connectDb from "../../db/db"


export async function DELETE(request,{params}) {
    try {
          await connectDb()
    const {id} = await params

    console.log('delte krna hai ')
    const response = await Product.findByIdAndDelete(id)


    return Response.json({
        success:true,
        ans : response
    })
    } catch (error) {
        console.log(error)
       return Response.json({
            success:false,
            ans:error
        })
    }
  
}