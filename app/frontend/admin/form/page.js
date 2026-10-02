'use client'

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import{file, json, z} from 'zod'
import Types from "./elements/fronttype"
// import Types from "./elements/fronttype"
import Occa from "./elements/occasion"


// zod bhai for 
const ans =z.array(z.object({
    color:z.string().min(1,'min one color'),
    id:z.number().min(1),
    image:z.array(z.any()).min(1, "At least one image required"),
    variants:z.array(z.object({
        size:z.string().min(1,'please provide size'),
        stock:z.number().min(1,'stock is not avilable')

    })).min(1)
})).min(1,'at least provide one size')


export default function Photo(){

// data fatching from backend 
const [data,setdata]= useState([])
useEffect(()=>{
    async function category(params) {
        
        // const data = await fetch('/backend/servers/category/send')
        const data= await fetch('/backend/formUpload/category/send')
        const response = await data.json()
        console.log( response)
        setdata(response.response)
    }
    category()
    
},[])

// producttypes data fetch 
const [subcategory,setcattegory]=  useState ([])
async function sunCat(params) {
    const data = await  fetch(`/backend/formUpload/subCategory/send?id=${params}`,{
        method:'GET'
    })
    const response = await data.json()
    console.log( 'ye hai subcat',response)
setcattegory(response.ans || [] )

    return response
}

// product category dat fethch
const [types2,settypes2]=useState([])
async function  types(params){
    const data = await fetch(`/backend/formUpload/typeProduct/lists?id=${params}`)
     const response = await data.json()
     console.log(response)
     settypes2(response.response || [])
     return response
}

    const [sec,setsec]=useState([])
    const [size ,setsize] = useState(['S','M','L','XL','2XL','3XL','4XL'])
    const [product,setproduct] = useState({
        name:'',
        category:'',
        productType:'',
        productCategory:'',
        ocassion:''
    })

    const [its,setits]= useState()
  
// formdata for upload image
const formdata = new FormData()



formdata.append('name',product.name)
formdata.append('category',product.category)
formdata.append('productType',product.productType)
formdata.append('productCategory',product.productCategory)
formdata.append('occassion',product.ocassion)
sec.forEach((variants)=>{
    // images
    formdata.append('variants',JSON.stringify({
        id:variants.id,
        color:variants.color,
        sizes:variants.variants
    }))

    variants.image.forEach(ans=>{
        formdata.append(`image ${variants.id}`,ans)
    })
    // size or stock
   
})

// formdata fetch 
async function upload(params) {
    const data = await fetch('/backend/formUpload/upload/post',{
        method:'POST',
        body:formdata
    })
}


    return (
 
    <div className="flex flex-col gap-4">

        {/* name section */}
        <div className="flex flex-col gap-2 ">
       
        <label htmlFor="name">name</label>
<input placeholder="name" className="name w-[200px] h-[50px] uppercase border-2 p-4 border-black rounded-2xl" onChange={(e)=>{
    setproduct((prev)=>({
        ...prev,
        name:e.target.value
    }))
}}></input>
        </div>


{/* category */}
<div className="flex flex-col gap-2">

          <label className="uppercase" htmlFor="category">category</label>
         <select onChange={ async(e)=>{
            // console.log(e.target.value)
          await sunCat(e.target.value)
          setproduct((prev)=>({
            ...prev,
            category:e.target.value
          }))
         }}  className="  category w-[200px] h-[50px] border-2 border-black rounded-2xl">
            <option value='' >select</option>
            {data.map(out=><option key={out._id} value={out._id} >{out.name}</option>)}
         </select>
</div>

{/* subcategory */}
          <label htmlFor="subcat" className="uppercase">product type </label>
          <select className="subcat w-[200px] h-[50px] border-2 border-black rounded-2xl" onChange={(e)=>{
            console.log(e.target.value)
            types(e.target.value)
            setproduct((prev)=>({
                ...prev,
                productType:e.target.value
            }))

          }} >
            <option value=''>product category</option>
            {subcategory.map(oot=><option value={oot._id} key={oot._id}>{oot.name}</option>)} 
          </select>
         
        
         <Types types2={types2} product={product} setproduct={setproduct} />

         <Occa  product={product} setproduct={setproduct}/>


        {sec.map((a,i)=><div className=" relative flex flex-col gap-6" key={a.id}>  <h2>get your images</h2>

       
            {/* color */}
            <input
            onChange={(e)=>{
              
                setsec(prev=>prev.map(col=>col.id===a.id ?{...col,color:e.target.value}:col))
            }}
            placeholder="color" className=" uppercase p-4 w-[200px] h-[60px] border-2 border-black rounded-2xl"></input>
            
            {/* size */}
          <div className="flex gap-8  ">
          
          {size.map((l,index)=><div className="flex flex-col text-center text-xl gap-3 "  key={index}> <h1>{l}</h1> 
          <input 
          checked ={a.variants.some(p=>p.size===l)}

          onChange={(e)=>{
            if(e.target.checked){
 setsec(prev=>prev.map(stk=> stk.id === a.id ? {...stk,variants:[...stk.variants ,{size:( e.target.value ) } ] }: stk  ))
            }
            else{
                 setsec(prev=>prev.map(stk=> stk.id === a.id ? {...stk,variants:stk.variants.filter(cc=>cc.size !==e.target.value)} : stk ))
            }
          }}
         
          value={l} type="checkbox" className=" w-[40px] h-[40px] border-2 border-black rounded-2xl"></input>


         <select 
        onChange={(e)=>{
            
            setsec(prev=>prev.map(check=>check.id === a.id ? {...check,variants:check.variants.map(st=>st.size=== l ? {...st,stock:Number(e.target.value) }:st ) }:check ))
        }}
         className="border-2 border-black rounded-2xl w-fit h-fit p-3" >{Array.from({length:40},(_,i)=><option key={i} value={i+1} >{i+1}</option>)}</select>

          </div>)
          }
          </div>


        {/* photo */}
        <div>
    
        <input  type="file" multiple className="w-[300px] h-[80px] border-2 border-black rounded-2xl " 
        onChange={(e)=>{
           const img = Array.from(e.target.files)
           setsec(prev=>prev.map(s=>s.id===a.id? {...s, image:img}:s  ))
        }} ></input>


        <button className="absolute top-10 left-180"><X size={40} className="cursor-pointer" onClick={()=>{
            setsec(prev=>prev.filter(section=>section.id !==a.id))
        }} /></button>
     </div>


        </div>)}

        
       {/* add section */}

<button 

onClick={()=>{
    
setsec(prev=>[...prev,{
    id:Date.now(),
    color:'',
    image:[],
    variants:[]

}])
}} className="h-fit w-fit p-3 bg-green-300 rounded-2xl"> Add section</button>

        <button onClick={ async()=>{
             const result = ans.safeParse(sec)
             if(!result.success){
                console.log(result.error)
                return
             }

            console.log('valid data',result.data)
            // console.log(product)
            const finalProduct ={
                ...product,
                variants:sec
            }
            setits(finalProduct)
            console.log(finalProduct)
            // upload without consent
          await  upload()
        }
        
        }
        disabled={sec.length===0}
        className="w-fit disabled:bg-gray-500 disabled:cursor-not-allowed     bg-red-400 h-fit p-3 border-2 border-black rounded-2xl"> {sec.length===0?<h1>please add section</h1> : <h1>submit image</h1>}  </button>
    </div>)
}