'use client'
import Fuse from "fuse.js"
import { useState } from "react"
export default function SearchPage() {
    const products = [
        // Men
        {
          id: 1,
          name: "Black Casual Shirt",
          category: "Men",
          subcategory: "Shirts",
          price: 799,
        },
        {
          id: 2,
          name: "Blue Denim Jeans",
          category: "Men",
          subcategory: "Jeans",
          price: 1299,
        },
        {
          id: 3,
          name: "Black Denim Jeans",
          category: "Men",
          subcategory: "Jeans",
          price: 1399,
        },
        {
          id: 4,
          name: "Black Cotton Kurta",
          category: "Men",
          subcategory: "Kurtas",
          price: 999,
        },
        {
          id: 5,
          name: "White T-Shirt",
          category: "Men",
          subcategory: "T-Shirts",
          price: 499,
        },
      
        // Women
        {
          id: 6,
          name: "Black Floral Dress",
          category: "Women",
          subcategory: "Dresses",
          price: 1499,
        },
        {
          id: 7,
          name: "Blue Skinny Jeans",
          category: "Women",
          subcategory: "Jeans",
          price: 1199,
        },
        {
          id: 8,
          name: "Red Cotton Kurti",
          category: "Women",
          subcategory: "Kurtis",
          price: 899,
        },
        {
          id: 9,
          name: "White Casual Shirt",
          category: "Women",
          subcategory: "Shirts",
          price: 799,
        },
        {
          id: 10,
          name: "Black Running Shoes",
          category: "Women",
          subcategory: "Shoes",
          price: 1599,
        },
      
        // Kids
        {
          id: 11,
          name: "Blue Kids T-Shirt",
          category: "Kids",
          subcategory: "T-Shirts",
          price: 299,
        },
        {
          id: 12,
          name: "Black Kids Jeans",
          category: "Kids",
          subcategory: "Jeans",
          price: 599,
        },
        {
          id: 13,
          name: "Pink Party Dress",
          category: "Kids",
          subcategory: "Dresses",
          price: 899,
        },
        {
          id: 14,
          name: "White School Shoes",
          category: "Kids",
          subcategory: "Shoes",
          price: 699,
        },
        {
          id: 15,
          name: "Red Kids Kurta",
          category: "Kids",
          subcategory: "Kurtas",
          price: 499,
        },
      ];

      const [search, setSearch] = useState('')
      const fuse = new Fuse(products,{
        keys:["name" ,'category' ,'subcategory','price'],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true,
      })


      const result = fuse.search(search,{
        limit: 2,
      })
      const menProduct = result .filter((item)=>item.item.category === 'Men')   

      const newPr= result.map((item)=>({
        name: item.item.name,
        category: item.item.category,
        score: item.score,
      }))


    //   ye hai suggestion
      const suggestions = result.map((itme)=>({
        id: itme.item.id,
        name: itme.item.name,
        price: itme.item.price,
        
      }))

      function handleSearch(e){
        const value = e.target.value
        setSearch(value)
        const ans =value.trim().toLowerCase()
        console.log(result)
        
      }


//       console.log (  'suggestions',suggestions)
//       console.log(menProduct)
//       console.log(fuse.search("black", { limit: 3 }));
// console.log(fuse.search("jeans", { limit: 2 }));

     


    return (
        <div>
            <h1>Search</h1>
            <input value={search} onChange={handleSearch} type="text" placeholder="Search" className="p-2 w-[400px] rounded-md border border-gray-300" />
        </div>
    )
}