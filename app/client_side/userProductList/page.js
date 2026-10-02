
import Image from "next/image";
import { cookies } from "next/headers";
import productlist from "@/app/store/cartSection/productList";
import Link from "next/link";
import AddToCart from "./buttons";
import CartButton from "./cartButton";
const cookeStore = await cookies()
const token = cookeStore.get('token')
async function getProduct(categoryName) {

  // this is for one server req for different purpose
 if(categoryName){
  const response = await fetch(`http://localhost:3000/backend/produtlist?category=${categoryName}`,{
    headers:{
      Cookie:token.value
    }
  });
const data = await response.json()
console.log('ye hia category wala data ',data)
return data.ans || []
  
 }
      
  const response = await fetch("http://localhost:3000/backend/produtlist",{
    headers:{
      Cookie:token.value
    }
  });
      const data = await response.json();
      console.log(data)
console.log('frontend cookies', cookeStore.get('token'))
// console.log( 'forntend cookie mili',cookieStore.getAll())
return data.ans || []
}



export default  async function ClientProduct({searchParams} ) {

  
  const resolve = await searchParams
const productCategory = resolve?.category
console.log(productCategory)

const product = await getProduct(productCategory)

  return (
    <main className="min-h-screen bg-body px-3 py-5 sm:px-5 md:px-8 lg:px-10">

      {/* Header */}
      <div className="w-full max-w-7xl mx-auto mb-6 sm:mb-8">
      <div className="w-full max-w-7xl mx-auto mb-5">
  <div className="flex items-center gap-3">

    {/* Search */}
    <div className="relative flex-1">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-white text-sm text-text outline-none focus:border-button transition"
      />

      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
        🔍
      </span>
    </div>

    {/* Cart */}
   <CartButton/>

  </div>
</div>
    
      </div>

      {/* Product Grid */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        
       {product.map((a, i) => {

    const slug = a.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    return (
        <article
            key={a._id || i}
            className="bg-white rounded-xl sm:rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition duration-200"
        >

            <Link href={`/client_side/orderPage/${slug}/${a._id}`}>

                {/* Product Image */}
                <div className="relative w-full aspect-square bg-light overflow-hidden">

                    {/* image */}

                    {a.productType.name && (
                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-xs font-medium bg-white/90 text-text px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                            {a.productType.name}
                        </span>
                    )}

                </div>

                {/* Product Info */}
                <div className="p-2.5 sm:p-3">

                    <h2 className="text-sm sm:text-base font-semibold text-text line-clamp-2 min-h-[40px]">
                        {a.Name}
                    </h2>

                    <div className="mt-1.5 sm:mt-2">
                        <span className="text-base sm:text-lg font-bold text-button">
                            ₹{a.productCategory.name}
                        </span>
                    </div>

                </div>

            </Link>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3">
                <AddToCart product={a} />

                <button className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg bg-button text-white hover:opacity-90 transition">
                    Buy Now
                </button>
            </div>

        </article>
    );
})}
           
      
      </section>
     
    </main>
  );
} 