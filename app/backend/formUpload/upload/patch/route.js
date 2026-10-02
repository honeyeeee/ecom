
import Product from "@/app/backend/db/productSchema"
import connectDb from "@/app/backend/db/db"
export async function PATCH(req) {
    try {
       connectDb()
         const {searchParams}= new URL(req.url)
      const id = searchParams.get('id')
      const body = await req.json()
      const find = await Product.findByIdAndUpdate(id,body,{new:true})
    //   const data = await find.json()
 console.log('ye hai data',find)
 return  Response.json(find)
    } catch (error) {
        console.log(error.message)
        return Response.json({
            msg:'unsuccessfull',
            ans:error.message
        })
    }
}