import { create } from "zustand";
// import Ocassion from "../backend/db/occasion";
const lists = create((set)=>({
    fest:[],
    variants : null,
    products : null,
    productInfo : [],
    addressInfo : null,
    savedAddresses : [],
    
    setSavedAddresses:(savedAddresses)=>{
        set({
            savedAddresses:savedAddresses
        })
    },
    itmes:async ()=>{
        // const data = await fetch('/backend/servers/occasion/lists')
        const data = await fetch('/backend/formUpload/occasion/lists')
        const response = await data.json()

        console.log(response)
        set({
            fest:response.response || []
        })

    },
    setVert:(variants)=>{
         set({
            variants:variants
         })
    },
    setProduct:(product)=>{
        set({
            products:product
        })
    },
    setProductInfo:(productInfo)=>{
        set({
            productInfo:productInfo
        })
    },
    setAddressInfo:(addressInfo)=>{
        set({
            addressInfo:addressInfo
        })
    }
}))

export default lists