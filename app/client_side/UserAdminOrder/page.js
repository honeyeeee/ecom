'use client'
import Image from "next/image"
import { useEffect, useState } from "react"

export default function UserOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {

        const getOrders = async () => {
            const data = await fetch('/backend/GetOrderApi')
            console.log("data", data)
            const response = await data.json()
            console.log("response", response)
            setOrders(response.orders)

        }
        getOrders()
    }, [])
    return (


        <div>
            <h1>User Orders</h1>
            <div className="flex flex-col gap-4 w-full h-min-screen">
                {orders.map(a => {
                    return (
                        <div className="w-[80%] h-fit p-4 border-2 border-black rounded-2xl flex flex-col gap-4">
                            {a.mainProduct.map(im => <div><Image
                                src={im.image}
                                alt={im.name}
                                width={100}
                                height={100}
                            />
                                <h2>{im.name}</h2>
                                <p>{im.price}</p>
                                <p>{im.color.name}</p>
                                <p>{im.size}</p>
                                <p>{a.status}</p>
                                <p>{a.paymentMethod}</p>
                                <p>{a.createdAt}</p>

                            </div>)}



                        </div>
                    )
                })}
            </div>
        </div>

    )
}