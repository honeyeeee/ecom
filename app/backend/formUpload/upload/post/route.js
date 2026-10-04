

// import ImageKit from "imagekit";
import ImageKit from "imagekit";
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
          { error: `File ${img.name} 5MB se badi hai.` },
          { status: 400 }  );
                }
                const buffer =  await img.arrayBuffer()
                const upload = Buffer.from(buffer)
                const binary = upload.toString('base64')

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

            const images = imageArray.map((item, index) => ({
                ...item,
                isThumbnail: index === 0,
            }))

            const obj ={
                color: {
                    name: vet.color,
                    ...(vet.hexCode ? { hexCode: vet.hexCode } : {}),
                },
                sizes: vet.sizes,
                images,
            }
            productA.push(obj)
          }

        const featuresRaw = formdata.get('features')
        const homepageTagsRaw = formdata.get('homepageTags')
        const features = featuresRaw ? JSON.parse(featuresRaw) : []
        const homepageTags = homepageTagsRaw ? JSON.parse(homepageTagsRaw) : []

        const slug = formdata.get('slug')
        const occasion = formdata.get('occasion')

         const bestData = {
                 name : formdata.get('name'),
                category:formdata.get('category'),
                productType:formdata.get('productType'),
                productCategory:formdata.get('productCategory'),
                description: formdata.get('description') || undefined,
                ...(slug ? { slug } : {}),
                features,
                basePrice: {
                    mrp: Number(formdata.get('mrp')),
                    sellingPrice: Number(formdata.get('sellingPrice')),
                },
                ...(occasion ? { occasion } : {}),
                status: formdata.get('status') || 'draft',
                homepageTags,
                variants:productA
         }
console.log('ye hai full product',bestData)


    await connectDb()
    await Prod.create(bestData)
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
