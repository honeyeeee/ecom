import { create } from "zustand";

const useSearchStore = create((set)=>({
    searchProducts: [],


    setsearch : (products)=>{
        set({searchProducts: products})
    }
}))

export default useSearchStore;