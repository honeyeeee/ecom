// 'use client'

// import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Buttons from "./actions/actions";
import Comp from "../admin/componente/comp";
// import { id } from "zod/locales";




// Baki tumhara saara exact code niche jaisa hai waisa hi rahega...

export default async function List() {

const response = await fetch("http://localhost:3000/backend/produtlist");
      const data = await response.json()
      const a = data.ans
console.log(a)




  return (

    <main className="min-h-screen bg-body px-4 py-6 md:px-8 lg:px-10">

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto mb-8">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-text">
              Product List
            </h1>

            <p className="text-sm text-muted mt-1">
              Manage and view all your products
            </p>
          </div>

          <Link
            href="/"
            className="w-fit px-5 py-2.5 rounded-xl bg-button text-white text-sm font-medium hover:opacity-90 transition"
          >
            + Add Product
          </Link>

        </div>

      </div>


      {/* Product Grid */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {a.map((a, i) => {

          return (

            <article
              className="bg-white rounded-2xl border border-border p-3 flex flex-col gap-4 shadow-sm hover:shadow-md transition duration-200"
              key={a._id || i}
            >

              {/* Image */}
              <div className="relative w-full aspect-[4/3] bg-light rounded-xl overflow-hidden">

                <Image
                  className="object-contain p-3 transition duration-300 hover:scale-105"
                  src={a.Image[0]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  alt={a.Name || "Product Image"}
                />

                {/* Category Badge */}
                {a.Category && (
                  <span className="absolute top-3 left-3 text-xs font-medium bg-white/90 text-text px-3 py-1.5 rounded-full shadow-sm">
                    {a.Category}
                  </span>
                )}

              </div>


              {/* Product Info */}
              <div className="px-1 flex flex-col gap-3">

                {/* Name + Price */}
                <div className="flex justify-between items-start gap-3">

                  <h2 className="text-base font-semibold text-text capitalize line-clamp-2">
                    {a.Name}
                  </h2>

                  <span className="text-lg font-bold text-button whitespace-nowrap">
                    ₹{a.Price}
                  </span>

                </div>


                {/* Gender */}
                {a.Gender && (
                  <span className="w-fit text-xs font-medium bg-light text-muted px-3 py-1 rounded-full">
                    {a.Gender}
                  </span>
                )}


                {/* Description */}
                <p className="text-sm text-gray-500 line-clamp-2 leading-5">
                  {a.Description}
                </p>


                {/* Stock */}
                <div className="flex items-center justify-between">

                  <span className="text-xs text-gray-500">
                    Stock
                  </span>

                  <span
                    className={
                      a.Stock > 0
                        ? "text-xs font-semibold bg-light text-button px-3 py-1 rounded-full"
                        : "text-xs font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full"
                    }
                  >
                    {a.Stock > 0 ? `${a.Stock} available` : "Out of stock"}
                  </span>

                </div>

              </div>


              {/* Actions */}
           
<Buttons id={a._id}/>
            </article>

          )

        })}

      </section>
{/* <Comp sure={sure} setsure={setsure} id={id} /> */}
    </main>
  )
}