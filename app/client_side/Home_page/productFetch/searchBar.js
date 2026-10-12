"use client"
import { Search } from "lucide-react";
import searchStore from "@/app/store/search";
import Fuse from "fuse.js";
import { useMemo, useRef, useState } from "react"
import useSearchStore from "@/app/store/search";



export default function fetchSearch(){
const [search, setSearch] = useState('');
const [filterWords, setFilterWords] = useState('');
const [sugest ,setSugest] = useState([]);
// const [remove ,setRemove]=[]

const searchProducts = useSearchStore((state) => state.searchProducts);
const searchBag = useSearchStore((state) => state.setsearch);
let wordsToRemove = ['for','in','of','to','from','with','as','by','on','at','up','down','out','over','under','again','further','then','once','here','there','when','where','why','how','all','any','some','one','two','three','four','five','six','seven','eight','nine','ten'];

const remove = new Set();
const removeAns = wordsToRemove.forEach((word)=>{
    remove.add(word.toLowerCase());
});


// this is for remove the words from the text
function removeWords(text){
    const words = text.split(' ');
      for (let word of words){
        if(remove.has(word.toLowerCase())){
            words.splice(words.indexOf(word), 1);
        }
      }
      let filteredText = words.join(' ');
     setFilterWords(filteredText);
    
}

// this is for fetch the data from the database
const fetchData = async () => {
    try {
        const response = await fetch('/backend/homeProductList');
        const data = await response.json();
        console.log(data);
        if(!data.success){
            throw new Error(data.message);
        }
        
        searchBag(data.data);
    } catch (error) {
        console.log(error);
    }
  
}

// prevent to fetch the data from the database when the search box is empty


// this is for search the data from the search box
useMemo(()=>{
    const fuse = new Fuse(searchProducts, {
        keys: ['name', 'features', 'basePrice.sellingPrice', 'category.name', 'productType.name', 'productCategory.name'],
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 2,
        fieldNormWeight: 1,
        useExtendedSearch: true,
    })
    const results = fuse.search(filterWords)
    
    // this is for suggestion
    const suggestion = results.map((item)=>({
       name: item.item.name,
       category: item.item.category.name,

    }))
    setSugest(suggestion);
    console.log(results)
    console.log( 'suggestion', suggestion)
},[filterWords])

// deboucne function for the search box
let timeout = useRef(null);
function debounce (value){
clearTimeout(timeout);
      timeout = setTimeout( () => {
       removeWords(value);
    }, 1000);
    
}

    return (
      <div className="relative">
        <label className="flex items-center gap-2 rounded-full border border-custom-border/60 bg-light px-3 py-1.5">
          <Search size={16} strokeWidth={1.7} className="shrink-0 opacity-60" />
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="w-24 bg-transparent text-sm outline-none placeholder:text-current/50 sm:w-36 md:w-44"
            onFocus={async () => {
              if (searchProducts.length === 0) {
                await fetchData();
              }
            }}
            onBlur={() => {
              setSugest([]);
            }}
            onChange={(e) => {
              let value = e.target.value;
              if(value.length > 0){
                debounce(value);
              }else{
                setSugest([]);
              }
             
            }}
          />
        </label>

        {sugest.length > 0 && (
          <div
            className="absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,16rem)] max-h-64 overflow-y-auto rounded-lg border border-custom-border bg-light py-1 text-sm shadow-md sm:w-56"
            role="listbox"
            aria-label="Search suggestions"
          >
            {sugest.map((item) => (
              <div
                key={item.name}
                role="button"
                className="border-b border-custom-border/30 px-3 py-2.5 last:border-b-0 hover:bg-card/80 transition-colors cursor-pointer"
              >
                <p className="truncate font-medium text-text">{item.name}</p>
                <p className="truncate text-xs text-head/65">{item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}