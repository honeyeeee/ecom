'use client'

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
  })


  
}
    return (
        <button onClick={()=>{
            
addToCart()
        }} className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg border border-button text-button hover:bg-light transition"> Add to Cart </button>
    )
    
}