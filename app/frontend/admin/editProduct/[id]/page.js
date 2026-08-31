'use client'

import { useEffect, useState, Suspense } from "react";
import Details from "../../form/phots_Upload/details";
import { useParams } from "next/navigation";

function EditForm() {
    const params = useParams()

    const [bag, setBag] = useState({
        Name: "",
        Category: "",
        Gender: "",
        Description: "",
        Price: "",
        Stock: ""
    });

    // patch request
    async function req() {
        const res = await fetch(`/backend/editProducts/${params.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bag)
        })
    }

    // get product
    useEffect(() => {
        if (!params?.id) return;
        
        async function getProduct() {
            const response = await fetch(`/backend/GetProduct/${params.id}`)
            const data = await response.json()
            setBag(data.ans)
            console.log(data)
        }

        getProduct()
    }, [params?.id])

    return (
        <div className="min-h-screen w-full bg-body flex flex-col items-center px-4 py-8 md:px-8">
            {/* Header */}
            <div className="w-full max-w-2xl mb-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-text">
                    Edit Product
                </h1>
                <p className="text-sm text-muted mt-1">
                    Update your product information
                </p>
            </div>

            {/* Form */}
            <Details
                bag={bag}
                setBag={setBag}
            />

            {/* Submit */}
            <div className="w-full max-w-2xl mt-5">
                <button
                    onClick={req}
                    className="w-full py-3 rounded-xl bg-button text-white font-medium hover:opacity-90 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default function Edit() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading edit form...</div>}>
            <EditForm />
        </Suspense>
    );
}