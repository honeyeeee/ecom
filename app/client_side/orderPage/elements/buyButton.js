
'use client'
import lists from "@/app/store/userUiState"

export default function Buy({ id }) {
     // const items = lists((state) => state.products)
     const product = lists((state) => state.products)
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
          <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-auto lg:pt-6">
               <button className="w-full bg-bg px-6 py-3 text-lg capitalize text-body outline-none sm:flex-1 sm:px-4 sm:text-xl lg:px-6" onClick={async () => {
                    console.log(product)
                    await datafind()

               }}>
                    buy now
               </button>
               <button className="w-full bg-bg px-6 py-3 text-lg text-body outline-none sm:flex-1 sm:px-4 sm:text-xl lg:px-6">
                    Add To Cart
               </button>
          </div>
     )
}