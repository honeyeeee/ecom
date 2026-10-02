'use client'

import { useState } from "react"
import lists from "@/app/store/userUiState"

export default function Colors({response }){

     const selectVarinat = lists((state)=>state.setVert)
     const Varinat = lists((state)=>state.variants)
    const [colorObj ,setcolor ] =useState(null)

    
    return(
    <>

    <div  className="flex  flex-col ml-15 mt-4 w-full">
                <div className="flex flex-col gap-2">

            <p className="text-xl font-medium tracking-wider ">select color</p>
            <div className="flex gap-8">

            <p className="w-[40px] h-[40px] rounded-full  border-[2px]
             border-black"></p>
             {/* console.log(response.ans.variants?.map(ar=>ar.color)) */}
             {response?.ans?.variants?.map((a,i)=>{return <button   key={i} className="w-[80px] h-fit py-1 border-black border-2 text-center" onClick={()=>{
                console.log(a)
                setcolor(a)
                selectVarinat(a)
                
             }} >{a.color}</button >})}
                </div>
            </div>

            {/* sizes */}
              <div className="flex flex-col gap-2  mt-6">
                <h3 className="text-xl tracking-wide">Size</h3>
            {colorObj ? <div className="flex gap-4"> {colorObj?.sizes?.map((io,i)=><p key={i} className="px-4 py-2 border-2 border-black w-[60px] h-[40px]">{io.size}</p>)}</div>  : "no size avilable" }

             
              </div>


            </div>
    </>)
}