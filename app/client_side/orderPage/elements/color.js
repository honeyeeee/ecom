'use client'

import { useEffect, useState } from "react"
import lists from "@/app/store/userUiState"

export default function Colors({response }){

     const selectVarinat = lists((state)=>state.setVert)
     const Varinat = lists((state)=>state.variants)
    const [colorObj ,setcolor ] =useState(null)
    const [disabled,setdisabled] = useState('')
  
  console.log('ye hai response form the color page ',response)
   
 const size = response.ans.variants[0].sizes.map(c=>c.size)

    const equal =  colorObj?disabled  : response.ans.variants[0].color
    
    useEffect(()=>{
if(!colorObj){
    selectVarinat(response.ans.variants[0])
}
    },[colorObj])

    

    return(
    <>
    <div  className="flex  flex-col ml-15 mt-4 w-full">
                <div className="flex flex-col gap-2">

            <p className="text-xl font-medium tracking-wider ">select color</p>
            <div className="flex gap-8">

            <p className="w-[40px] h-[40px] rounded-full  border-[2px]
             border-black"></p>
             {/* console.log(response.ans.variants?.map(ar=>ar.color)) */}
             {response?.ans?.variants?.map((a,i)=>{return <button type="button" value={a.color}  key={i}
             disabled ={equal===a.color}    
             className={ equal === a.color ? " disabled: w-[80px] h-fit py-1 border-black border-2   bg-gray-300 text-center" :  " w-[80px] h-fit py-1 border-black border-2 text-center" }   
             onClick={()=>{
                console.log(a)
                setcolor(a)
                selectVarinat(a)
                setdisabled(a.color)

                
             }} >{a.color}</button >})}
                </div>
            </div>

            {/* sizes */}
              <div className="flex flex-col gap-2  mt-6">
                <h3 className="text-xl tracking-wide">Size</h3>
        
            {colorObj ? <div className="flex gap-4"> {colorObj?.sizes?.map((io,i)=><button key={i} className=" cursor-pointer px-4 py-2 border-2 border-black w-[60px] h-[40px]">{io.size}</button>)}</div>  : 
            
            <div className="flex gap-6"> {response.ans.variants[0].sizes.map((c,index)=><button  key={index} className=" cursor-pointer px-4 py-2 border-2 border-black w-[60px] h-[40px]">{c.size}</button> 
        )
         }
        </div>  }
              </div>
            </div>
    </>)
}