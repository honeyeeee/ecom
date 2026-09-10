'use client'
import productlist from "@/app/store/cartSection/productList"
import { useEffect, useState } from "react"
// import { el } from "zod/locales"
export default  function AddToCart({ product}){
   


async function addToCart() {
  const carry = await fetch('/backend/backendCart/addToCart',{
    method:"POST",
    credentials:"include",
    headers:{
        "Content-type":'application/json'
    },
    body:JSON.stringify({
        productId:product._id,
        quantity:1
    })
  }


)
console.log(carry)
return carry
}

// state
const nameChanger = productlist((state)=>state.nameChanger)

const list=productlist((state)=>state.list)

const cartOpen = productlist((state)=>state.cartOpen)
const sameName=productlist((state)=>state.sameName)
const products=productlist((state)=>state.products)
  const openCart=productlist((state)=>state.openCart)
  const changeName= productlist((state)=>state.changeName)


const cartProdu = productlist((state)=>state.cartProdu)

// Name change 
const [name,setName]=useState(false)

  async function checkPoint (){
    const find = cartProdu.find( async a=>{

  return  (a.productId._id === product._id) 

    }
  
  )
    if(find){
      console.log( 'kuch mila hai bc ',cartProdu)
      console.log( 'find mila hai bc ',find)
      openCart()
 await products()
}
else{
  await addToCart()
   const lela = await list()
   changeName()
   console.log('ye lelea hai ',lela)
}

}


function matching (){
  const find = cartProdu.find(a=>{
    console.log('matching fun chala ')
    return a.productId._id ===product._id
    
  })

  if(find){
console.log(  'ye hai maching ka fing ',find)
    changeName() //true
  }
else{
  console.log(  'ye hai maching2 ka fing ',find)
  sameName() //false
}
}



useEffect(()=>{
  async function refersh(params) {
    await list()
   
  }
   refersh()
},[])

useEffect(()=>{
  matching()

},[cartProdu])


    return (
        <button onClick={async ()=>{

           const data = await checkPoint()
          //  finding funtion for avilability in cart
           console.log('ye hai check point ka data',nameChanger)
            

        }} className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg border border-button text-button hover:bg-light transition">{nameChanger ? 'Go To Cart' : "Add to Cart"}  </button>
    )
    
}


