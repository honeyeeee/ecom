// import { continueStaticFallbackPrerender } from "next/dist/server/app-render/stream-ops.web";
import { create } from "zustand";
// import Cart from "@/app/backend/db/cart";

async function fetchCart(params) {
    const data = await fetch('/backend/backendCart/cartProducts',{
        credentials:"include"
    })
    const response = await data.json()
    return response.products || []
}




const productlist = create((set)=>(
    
    {
    
    cartItems:[],
    subtotal:0,
    productsNumber:0,
    cartProdu:[],
    cartOpen: false,
    nameChanger:false,

    products : async ()=>{
        const product= await fetchCart()
        console.log ('ye hai bhai prppwwp',product)
          
             set({
                cartItems:product
             })
    },

    list : async ()=>{
             const product= await fetchCart()
             set({
                cartProdu:product,
                productsNumber:product.length
             })
    },
    productLength: async() =>{
        const product = await fetchCart()
        console.log(product)
        const size = product.length
        set({
            productsNumber:size
        })
    },
    deleteCartProduct : async (id) =>{
        const data = await fetch('/backend/backendCart/delteProduct',{
            method:'DELETE',
            headers:{
                'Content-type':'application/json'
            },
            credentials:"include",
            body:JSON.stringify({
                id : id
            })
        })

        const resoponse = await data.json()

        console.log(data)
        return resoponse
    },
    
    removeFromCartFrontend : (id)=>{
         set((state)=>{
      
            return {

                cartItems:state.cartItems.filter(a=>a.id !==id) 
            }
         })
    },
    removeFrontend : (id)=>{
         set((state)=> {
                  const update = state.cartProdu.filter(a=>a.id !==id) 
                  const reduce = update.length
            return{
                cartProdu:update,
                productsNumber:reduce  
            }
         }
            
         )
    },


    // cart foonted button section 

     openCart:()=>  set({
        cartOpen:true
        
     }),

     closeCart: ()=> set({
        cartOpen:false
        
     }),
    

    //  
    changeName:()=> set({
        nameChanger:true
    }),

    sameName:()=>set({
        nameChanger:false
    })
    
}))
export default productlist