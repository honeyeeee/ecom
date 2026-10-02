import Product from "../../db/productSchema"
import connectDb from "../../db/db"
export async function POST(request) {
    try {
        await connectDb()
          const body = await request.json()
    const build = await Product.create({
        name:body.name,
        category:body.category,
        subcategory:body.subcategory,
        price:body.price,
        variants:body.variants
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