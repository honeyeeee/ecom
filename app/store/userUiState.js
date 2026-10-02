import { create } from "zustand";
// import Ocassion from "../backend/db/occasion";
const lists = create((set)=>({
    fest:[],
    variants : null,

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
    }

}))

export default lists