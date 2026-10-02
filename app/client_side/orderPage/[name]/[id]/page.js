
import { cookies } from "next/headers";
import Image from "next/image";
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
    <main className="p-6 bg-body">

      <section className="flex flex-col items-center justify-center"
      >
        <div className="w-[95%] min-h-[400px]  max-h-[650px] border-2 flex  border-black rounded-2xl ">
  
  

          {/* for images */}
          <div className="w-[50%] flex justify-around  items-center min-h-[600px] max-h-[700px] border-green-500 border-4 rounded-2xl ">

{/* photo section */}
<Photo response ={response}/>
          </div>
         {/* info secton */}

         <div className="w-[50%] flex flex-col items-center  min-h-[600px] max-h-[700px] border-4 border-red-500 rounded-2xl">

            {/* name price section */}
            <div className="mt-6 ml-8">
                <h2  className="border-[1px] border-black mb-3 w-fit h-fit p-1 rounded-full py-2 px-2 ">{response.ans.productType.name}</h2>
           <h1 className="text-3xl font-cantata tracking-wide w-[80%] ">{response.ans.name} </h1>

           <h2 className="mt-3 text-xl">reating section</h2>

           <p className="mt-4 font-bold text-3xl tracking-wider text-bg">$1000</p>

           {/* description */}
           <p className="w-[80%] text-sm mt-1 tracking-wide">Upgrade your daily style with our premium oversized fit t-shirt. Built with 100% bio-washed cotton, it offers an effortlessly cool silhouette and maximum all-day comfort.</p>

{/* line */}
            </div>

           <div className="w-[80%] border-[0.01rem] border-bg mt-6"></div>
            

            {/* color size */}
            <Colors response={response}   />

            <div className="ml-15 flex  gap-10 w-full h-full">
                   <button className=" text-xl  text-body w-fit h-fit px-18 py-4 mt-8 bg-bg outline-none capitalize">
                    buy now
                   </button>
                   <button className=" text-xl  text-body w-fit h-fit px-18 py-4 mt-8 bg-bg outline-none">
                    Add To Cart
                   </button>
            </div>

         </div>

        </div>
      </section>
      
    </main>
  );
}