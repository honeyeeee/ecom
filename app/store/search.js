import { create } from "zustand";

const useSearchStore = create((set)=>({
    search: [],


    setsearch : (products)=>{
        set({search: products})
    }
}))

export default useSearchStore;