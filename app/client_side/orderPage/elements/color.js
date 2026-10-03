'use client'

import { useEffect, useState } from "react"
import lists from "@/app/store/userUiState"

export default function Colors({response }){

    // tish from zustad
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
    <div  className="mt-4 flex w-full max-w-2xl flex-col px-1">
                <div className="flex flex-col gap-2">

            <p className="text-xl font-medium tracking-wider ">select color</p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">

            <p className="w-[40px] h-[40px] rounded-full  border-[2px]
             border-black"></p>
             {/* console.log(response.ans.variants?.map(ar=>ar.color)) */}
             {response?.ans?.variants?.map((a,i)=>{return <button type="button" value={a.color}  key={i}
             disabled ={equal===a.color}    
             className={ equal === a.color ? "h-fit min-w-16 border-2 border-black bg-gray-300 px-3 py-1 text-center sm:min-w-20" :  "h-fit min-w-16 border-2 border-black px-3 py-1 text-center sm:min-w-20" }
             onClick={()=>{
                console.log(a)
                setcolor(a)
                selectVarinat(a)
                setdisabled(a.color)

                
             }} >{a.color}</button >})}
                </div>
            </div>

            {/* sizes */}
              <div className="mt-6 flex flex-col gap-2">
                <h3 className="text-xl tracking-wide">Size</h3>
        
            {colorObj ? <div className="flex flex-wrap gap-2 sm:gap-3"> {colorObj?.sizes?.map((io,i)=><button key={i} className="h-10 w-[60px] cursor-pointer border-2 border-black px-3 py-2">{io.size}</button>)}</div>  :
            
            <div className="flex flex-wrap gap-2 sm:gap-3"> {response.ans.variants[0].sizes.map((c,index)=><button  key={index} className="h-10 w-[60px] cursor-pointer border-2 border-black px-3 py-2">{c.size}</button>
        )
         }
        </div>  }
              </div>
            </div>
    </>)
}
