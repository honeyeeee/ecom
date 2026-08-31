
import Product from "../../db/productSchema"
import { revalidatePath } from "next/cache";
export async function PATCH(request , {params}) {

    
    const {id}= await params
    const body = await request.json()
try {
     if(!body && !id){
        console.log('we dont get credentials')
        return
    }
const find = await Product.findByIdAndUpdate(id,body,{new:true})

    revalidatePath("/frontend/productlist");
return Response.json(find);


} catch (error) {
    console.log(error)
    return Response.json(error)
}
   
}