

// import ImageKit from "imagekit";
import ImageKit from "imagekit";
// import Product from "@/app/backend/db/productSchema";
import Product from "@/app/backend/db/productSchema";
import connectDb from "@/app/backend/db/db";
import Prod from "@/app/backend/db/productSchema";


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
export async function POST(req) {
    
    try {
        const formdata = await req.formData() 
        console.log(formdata)

        const variant = formdata.getAll('variants').map(a=>JSON.parse(a))
        console.log( 'ye hai variants',variant)
        const productA=[]
          for(let vet of variant){
            const image = formdata.getAll(`image ${vet.id}`)
            
            const imageArray =[]
            for (let img of image){

                if (img.size>5*1024*1024){
                    return Response.json(
          { error: `File ${file.name} 5MB se badi hai.` },
          { status: 400 }  );
                }
                const buffer =  await img.arrayBuffer()
                const upload = Buffer.from(buffer)
                const binary = upload.toString('base64')

                //  upload on imagekit

                console.log('bat image tk pahuchi  kya')
                const result = await imagekit.upload({
                    file:binary,
                    fileName:img.name,
                    folder:'/products'
                })
                console.log( 'ye image result hai ', result)
                imageArray.push({
                    url:result.url,
                    id:result.fileId
                })
            }
            // console.dir(imageArray,{depth:null})


            const obj ={
              
                color:vet.color,
                sizes:vet.sizes,
                image:imageArray
            }
            productA.push(obj)
          }

        //   console.log('ye hia product',productA)
        
         const bestData = {
                 name : formdata.get('name'),
                category:formdata.get('category'),
                productType:formdata.get('productType'),
                productCategory:formdata.get('productCategory'),  
                variants:productA
         }
console.log('ye hai full product',bestData)


// data sent to db bro
    await connectDb()
    const productCreate= await Prod.create(bestData)
    console.log('data submitted in db')
    
        return Response.json({
            success:true,
            message:'prduct build successfully',
            response:bestData
        })
        
    } catch (error) {
        console.log(error.message)
        return Response.json({
            success:false,
            message:error.message
        },
    {status:500})
    }
}