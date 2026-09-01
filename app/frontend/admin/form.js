'use client'

import { useState } from 'react'
import { z } from 'zod'
import Link from "next/link"

import Upload from './form/phots_Upload/photo'
import Details from './form/phots_Upload/details'


const str = z.object({
    Name: z.string().min(1),
    Category: z.enum(['School Bag', "Collage Bag", "Travel Bag", "Office Bag", "Premium Bag"]),
    Gender: z.enum(["Male", "Female", "Unisex"]),
    Description: z.string().min(1),
    Price: z.coerce.number().positive(),
    Image: z.array(z.file()).nullable(),
    Stock: z.coerce.number().positive()
})


const handlebag = {
    Name: "",
    Category: "",
    Gender: "",
    Description: "",
    Price: "",
    Image: [],
    Stock: ""
}


export default function Form() {

    const [bag, setBag] = useState(handlebag)
    const [disabled, setDisabled] = useState(false)

    const formdata = new FormData()

    formdata.append("Name", bag.Name)
    formdata.append("Category", bag.Category)
    formdata.append("Gender", bag.Gender)
    formdata.append("Description", bag.Description)
    formdata.append("Price", bag.Price)
    formdata.append("Stock", bag.Stock)

    bag.Image.forEach((image) => {
        formdata.append("Image", image)
    })


    async function done() {

        console.log(bag.Image)

        const resutl = str.safeParse(bag)
        console.log(resutl)

        if (!resutl.success) {
            console.log(`this is illegal bro`)
            return
        }

        setDisabled(true)

        try {

            const ask = await fetch('/backend/uploadProduct', {
                method: "POST",
                body: formdata
            })

            setBag(handlebag)

            const fileInput = document.getElementById('image')

            if (fileInput) fileInput.value = ''

            console.log('all set')

        }

        finally {
            setDisabled(false)
        }

    }


    return (
        <div className="flex flex-col gap-8 w-full min-h-screen bg-[#F5F1E8] items-center">

            {/* Header */}
            <div className="w-full p-5 md:p-6 flex flex-col sm:flex-row gap-3 items-center justify-between px-6 md:px-10 bg-emerald-950 shadow-md">

                <h1 className="font-cantata text-xl md:text-2xl text-white">
                    Upload your product here
                </h1>

                <Link
                    href="/frontend/admin/productlist"
                    className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-sm font-medium transition"
                >
                    Product List
                </Link>

            </div>


            {/* Form Area */}
            <div className="flex flex-col gap-6 w-[92%] max-w-md items-center md:flex-row md:max-w-3xl lg:max-w-5xl lg:items-center">

                <Upload
                    images={bag.Image}
                    setBag={setBag}
                    bag={bag}
                />

                <Details
                    bag={bag}
                    setBag={setBag}
                />

            </div>


            {/* Submit Button */}
            <button
                onClick={done}
                disabled={disabled}
                className="w-[92%] max-w-5xl h-fit p-3 rounded-xl text-lg font-medium bg-emerald-950 text-white hover:bg-emerald-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Upload
            </button>

        </div>
    )
}