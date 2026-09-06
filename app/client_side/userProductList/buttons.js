'use client'
import productlist from "@/app/store/cartSection/productList"
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
const cartProdu = productlist((state)=>state.cartProdu)
const productLength = productlist((state)=>state.productLength)


  async function checkPoint (){
    const find = cartProdu.find(a=>{
        a.productId._id === product._id
    })

    if(!find){
         const resoponse = await addToCart()
         
          if(resoponse.ok){

    await  productLength()
  }
    }


    else{
        
    }
}


    return (
        <button onClick={async ()=>{
            
            const resoponse = await addToCart()
  if(resoponse.ok){

    await  productLength()
  }
  

        }} className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg border border-button text-button hover:bg-light transition"> Add to Cart </button>
    )
    
}


