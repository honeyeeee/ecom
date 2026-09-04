'use client'
import useCartStore from "@/app/store/cartStore"
export default  function AddToCart({ product}){
     const addProduct = useCartStore((state) => state.addProduct)
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

if(carry.ok){
return    addProduct(product)

}
else{
   console.log("unsuccessful request")
}

  
}
    return (
        <button onClick={async ()=>{
            
  await addToCart()
  

        }} className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg border border-button text-button hover:bg-light transition"> Add to Cart </button>
    )
    
}


