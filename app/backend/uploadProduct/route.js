// app/backend/uploadProduct/route.js
import { revalidatePath } from "next/cache";
import ImageKit from "imagekit";
import Product from "../db/productSchema";
import connectDb from "../db/db";

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT

});


export async function POST(req) {
connectDb()
  // console.log("this data comming form sever",req)
  try {
   
    const formData = await req.formData(); 
if(!formData){
  console.log('we need somthing bro')
  return 
}
    const image = formData.getAll('Image')
    const uploadedImages = []

   for (let ima of image){
    const buffer = Buffer.from(await ima.arrayBuffer())
    
    
    const result = await imagekit.upload({
        file: buffer,
        fileName: ima .name,
    })

    uploadedImages.push(result.url)
    console.log(uploadedImages)
   }
    
    const urls = uploadedImages


    const name = formData.get("Name")
    const Gender = formData.get('Gender')
    const Price = formData.get('Price')
    const Description =formData.get("Description")
    const Category= formData.get("Category")
    const Stock = formData.get("Stock")
    
    
    console.log('produt k pas gadi phauch gaye')
// upload in db
await Product.create({
  Name:name,
  Category:Category,
  Gender:Gender,
  Description:Description,
  Price:Price,
  Image:urls,
  Stock:Stock
  
})

revalidatePath("/client_side");

    return Response.json({ success: true, message: "Product uploaded successfully!" });
  } catch (error) {
    console.log(error)
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}