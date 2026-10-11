"use client"
import { Search } from "lucide-react";
import searchStore from "@/app/store/search";
export default function fetchSearch(){
    const searchBag = searchStore.getState().setsearch;
   
    async function fetchData(){
        try {
            const res = await fetch("/backend/homeProductList")
            const data = await res.json()
            console.log( 'data from fetch',data)
            searchBag(data)
        } catch (error) {
            console.log(error.message)
            return []
        }
    }
    return(<div>
        
        <label className="flex items-center gap-2 rounded-full border border-custom-border/60 bg-light px-3 py-1.5">
            <Search size={16} strokeWidth={1.7} className="shrink-0 opacity-60" />
            <input
              type="search"
              placeholder="Search"
              aria-label="Search"
              className="w-24 bg-transparent text-sm outline-none placeholder:text-current/50 sm:w-36 md:w-44"
              onClick={fetchData}
              
            />
          </label>
    </div>)
}