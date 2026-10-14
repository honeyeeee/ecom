
import { getAuthenticatedUser } from "../cart/auth";
import connectDb from "../db/db";
import Prod from "../db/productSchema";
import Orders from "../db/ordersSchema";
import Address from "../db/addressScema";
import {z} from "zod";
import { NextResponse } from "next/server";
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
                    {'size.size': items.size.trim().toUpperCase()},
                    {'stock.stock': {$gte: items.quantity}}
                ]
            }
           )
           
           if(!findProduct){
            return NextResponse.json({ error: "Product size or color is not correct" }, { status: 400 })
           }
        //    const addres= findProduct.address.find(info => info.id === address.id)
        const address  = 
        await Address.findById(address._id)
        if(!address){
            return NextResponse.json({ error: "Address not found" }, { status: 400 })
        }
 
        
          
           const order = await Orders.create({
            user: user._id,
            product: findProduct._id,
            mainProduct: product,
            userAddress: address._id,
            paymentMethod: paymentMethod,
            status: "pending",
            totalPrice: findProduct.variants.find(info => info.color.name === items.color.name.trim() && info.sizes.find(num=>num.size.toUpperCase() === items.size.trim().toUpperCase())).price * items.quantity,
            quantity: items.quantity,

           })




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
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}