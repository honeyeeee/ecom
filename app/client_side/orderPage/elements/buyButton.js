'use client'
import lists from "@/app/store/userUiState"
import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"

export default function Buy({ id }) {
     const product = lists((state) => state.products)
     const [displayQty, setDisplayQty] = useState(1)

     const datafind = async () => {
          try {
               const data = await fetch(`/backend/UserInfo/${id}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         product
                    })
               })

               const response = await data.json();
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <div className="mt-8 flex w-full flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
               {/* Quantity Selector UI */}
               <div className="flex h-12 w-32 shrink-0 items-center justify-between rounded-full border border-custom-border bg-light px-3 text-text shadow-sm">
                    <button
                         type="button"
                         onClick={() => setDisplayQty((prev) => Math.max(1, prev - 1))}
                         className="flex h-7 w-7 items-center justify-center rounded-full text-head transition hover:bg-card hover:text-text cursor-pointer"
                         aria-label="Decrease quantity"
                    >
                         <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-semibold select-none text-text">
                         {displayQty}
                    </span>
                    <button
                         type="button"
                         onClick={() => setDisplayQty((prev) => prev + 1)}
                         className="flex h-7 w-7 items-center justify-center rounded-full text-head transition hover:bg-card hover:text-text cursor-pointer"
                         aria-label="Increase quantity"
                    >
                         <Plus className="h-3.5 w-3.5" />
                    </button>
               </div>

               {/* Buy Now Button (Primary CTA) */}
               <button
                    type="button"
                    className="flex h-12 flex-1 items-center justify-center rounded-full bg-button px-6 text-sm font-semibold tracking-wide text-light shadow-sm transition-all duration-200 hover:bg-button-hover active:scale-[0.98] cursor-pointer"
                    onClick={async () => {
                         console.log(product)
                         await datafind()
                    }}
               >
                    Buy Now
               </button>

               {/* Add To Cart Button (Secondary CTA) */}
               <button
                    type="button"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-custom-border bg-light/60 px-6 text-sm font-semibold tracking-wide text-text transition-all duration-200 hover:border-button hover:bg-card active:scale-[0.98] sm:min-w-[150px] cursor-pointer"
               >
                    <ShoppingCart className="h-4 w-4 text-head" />
                    <span>Add To Cart</span>
               </button>
          </div>
     )
}