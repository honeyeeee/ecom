
import { getAuthenticatedUser } from "../cart/auth";
import connectDb from "../db/db";
import Prod from "../db/productSchema";
import Orders from "../db/ordersSchema";
import Address from "../db/addressScema";
import {z} from "zod";
import { NextResponse } from "next/server";

const orderSchema = z.object({
    mainProduct: z.array(z.object({
        id: z.string(),
        name: z.string(),
        color: z.object({
            name: z.string(),
        }),
        size: z.string(),
        stock: z.number(),
        price: z.number(),
        image: z.string(),
        quantity: z.number(),
    })),
    userAddress:z.string(),
    paymentMethod: z.string(),
    totalPrice: z.number(),
    quantity: z.number(),
    user: z.string(),
})


export async function POST(request, { params }) {
    
    console.log('request hai from orderBackendApi', request)
    try {
        await connectDb()
        const user = await getAuthenticatedUser()

        console.log('user hai from orderBackendApi', user)
        if(!user){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
            
        }
        const body = await request.json()
        // console.log('body hai from orderBackendApi', body)
        const { product, address, paymentMethod} = body
         console.log('product hai from orderBackendApi', product)
         console.log('address hai from orderBackendApi', address)
         console.log('paymentMethod hai from orderBackendApi', paymentMethod)
         console.log('product.id hai from orderBackendApi', product.id)

        //  find product by id

        //  find product by id


         const products = product.map(async (items) => {
            console.log('items hai from orderBackendApi', items)
            console.log('items.color hai from orderBackendApi', items.color)
           

            // get price of the product
            const price = await Prod.findById(items.id)
            console.log('price hai from orderBackendApi', price)

            // get total price of the product
            const total = price.basePrice.sellingPrice * items.quantity
            console.log('total hai from orderBackendApi', total)
 

            // update the product stock
           const findProduct = await Prod.findByIdAndUpdate({
            _id: items.id,
                    variants:{
                        $elemMatch:{
                            "color.name":{
                                $eq: items.color.name.trim()
                            },
                            sizes:{
                                $elemMatch:{
                                    size:{
                                        $eq: items.size.trim().toUpperCase()
                                    },
                                    stock:{
                                        $gte: items.quantity
                                    }
                                }
                            }
                        }
                    }
                }
                
            ,
            {
                $inc:{
                    'variants.$[variant].sizes.$[size].stock': - items.quantity
                }
            },
            {
                arrayFilters:[
                    {'variant.color.name': items.color.name.trim()},
                    {'size.size': items.size.trim().toUpperCase()

                    ,'size.stock': {$gte: items.quantity}
                    },
                ],
                new: true
            }
           )

           if(!findProduct){
               return NextResponse.json({ error: "Product size or color is not correct" }, { status: 400 } ,{order: false})
            }
            
            //  find address by id
            console.log('user._id hai from orderBackendApi', user.user._id)
            console.log('address hai from orderBackendApi', address)

const addressFind = address.find(info => info.user===user.user._id.toString())

// console.log('addressFind hai from orderBackendApi', addressFind)

    
           if(!addressFind){
            return NextResponse.json({ error: "Address not found" }, { status: 400 } ,{success: false})
           }
        const addressInfo  = 
        await Address.findOne({_id: addressFind._id})  
        if(!addressInfo){
            return NextResponse.json({ error: "Address not found" }, { status: 400 } ,{success: false})
        }
          


        // verify output of the order
        const result = orderSchema.safeParse({
            product: findProduct._id.toString(),
            mainProduct: product,
            userAddress: addressInfo._id.toString(),
            paymentMethod,
            totalPrice: total,
            quantity: items.quantity,
            user: user.user._id.toString(),
          });
          
          if (!result.success) {
            return NextResponse.json(
              {
                error: "Invalid order data",
                details: result.error.flatten(),
              },
              { status: 400 },
              {varify:false}

            );
          }
        //  create order
        const order = await Orders.create({
            user: user.user._id,
            product: findProduct._id,
            mainProduct: product,
            userAddress: addressInfo._id,
            paymentMethod: paymentMethod,
            status: "pending",
            totalPrice: total,
            quantity: items.quantity,
           })
               if(!order){
                return NextResponse.json({ error: "Order not created" }, { status: 400 })
               }
             
 
        
        
          
            // const colorName = items.color.name.trim()
            // const sizeName = items.size.trim().toUpperCase()
            // const stock = items.quantity
           
            // const findVariant= findProduct.variants.find(info => info.color.name === colorName && info.sizes.find(num=>num.size.toUpperCase() === sizeName && num.stock >= stock)    )
            // if(!findVariant){
            //     console.log('Product size or color is not correct')
            //     return NextResponse.json({ error: "Product size or color is not correct" }, { status: 400 })
            // }
            //  findVariant.stock -= stock
            //   await findProduct.save()
            //  return findVariant

        })
         
        

        
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 },{success: false})
    }
}