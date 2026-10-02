'use state'
import lists from "@/app/store/userUiState"
// import lists from "@/app/store/userUiState"
import { useEffect } from "react"
export default function Occa({product,setproduct}){
    const fest = lists((state)=>state.fest)
    const items = lists((state)=>state.itmes)
    
    useEffect(()=>{
      async function call(){
        await items()
      }
      call()
    },[])
    return(
        <div className="flex flex-col gap-4">
       <label htmlFor="occasion" className="uppercase">occasion</label>
        <select onChange={(e)=>{
            setproduct((prev)=>({
                ...prev,
                occasion:e.target.value
            }))
        }} className="occasion  w-[200px] h-[50px] border-2 border-black rounded-2xl " >
            <option>select</option>
            {fest.map(a=><option key={a._id} value={a.occasion} >{a.occasion}</option>)}
        </select>
        </div>
    )
}