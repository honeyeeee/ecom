
import { cookies } from "next/headers";
import Photo from "../../elements/photo";
import Colors from "../../elements/color";
// import { useState } from "react";


export default async function ProductPage({params}) {


  const {id} = await params

     const cookieStore = await cookies();


    const data = await fetch(`http://localhost:3000/backend/orderProduct/${id}`,{
        method:'GET',
        headers:{
            Cookie: cookieStore.toString(),
        }
    })
    const response = await data.json()
    console.log(response.ans)
    console.log(response?.ans?.variants?.map(ar=>ar.color))
 


  return (
    <main className="bg-body p-3 sm:p-6">

      <section className="flex flex-col items-center justify-center"
      >
        <div className="flex w-full max-w-7xl flex-col overflow-hidden rounded-2xl  lg:w-[95%] lg:flex-row">
  
  

          {/* for images */}
          <div className="flex h-[min(95vw,34rem)] w-full items-center justify-around  lg:h-[600px] lg:max-h-[700px] lg:w-1/2">

{/* photo section */}
<Photo response ={response}/>
          </div>
         {/* info secton */}

         <div className="flex w-full flex-col items-center  px-4 pb-6 sm:px-8 lg:min-h-[600px] lg:max-h-[700px] lg:w-1/2">

            {/* name price section */}
            <div className="mt-6 w-full max-w-2xl lg:px-2">
                <h2  className="border-[1px] border-black mb-3 w-fit h-fit p-1 rounded-full py-2 px-2 ">{response.ans.productType.name}</h2>
           <h1 className="w-full text-2xl font-cantata tracking-wide sm:text-3xl">{response.ans.name} </h1>

           <h2 className="mt-3 text-xl">reating section</h2>

           <p className="mt-4 font-bold text-3xl tracking-wider text-bg">$1000</p>

           {/* description */}
           <p className="mt-1 w-full text-sm tracking-wide">Upgrade your daily style with our premium oversized fit t-shirt. Built with 100% bio-washed cotton, it offers an effortlessly cool silhouette and maximum all-day comfort.</p>

{/* line */}
            </div>

           <div className="mt-6 w-full max-w-2xl border-[0.01rem] border-bg"></div>
            

            {/* color size */}
            <Colors response={response}   />

            <div className="mt-6 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-auto lg:pt-6">
                   <button className="w-full bg-bg px-6 py-3 text-lg capitalize text-body outline-none sm:flex-1 sm:px-4 sm:text-xl lg:px-6">
                    buy now
                   </button>
                   <button className="w-full bg-bg px-6 py-3 text-lg text-body outline-none sm:flex-1 sm:px-4 sm:text-xl lg:px-6">
                    Add To Cart
                   </button>
            </div>

         </div>

        </div>
      </section>
      
    </main>
  );
}
