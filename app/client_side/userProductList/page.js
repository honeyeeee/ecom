
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
            className="group flex flex-col bg-white rounded-[28px] sm:rounded-[32px] border border-head/20 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >

            <Link href={`/client_side/orderPage/${slug}/${a._id}`}>

                {/* Product Image */}
                <div className="relative w-full aspect-[4/4.2] bg-light overflow-hidden">

                    {a.variants?.[0]?.images?.[0]?.url && (
                        <Image
                            src={a.variants[0].images[0].url}
                            alt={a.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}

                    {a.homepageTags?.[0] && (
                        <span className="absolute top-3 left-3 rounded-full bg-body/90 px-3 py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-head">
                            {a.homepageTags[0].replace(/([A-Z])/g, " $1")}
                        </span>
                    )}

                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-5">

                    <h2 className="font-cantata text-lg sm:text-xl font-semibold text-text line-clamp-2">
                        {a.name}
                    </h2>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-head truncate">
                        SKU: {a.variants?.[0]?.sizes?.[0]?.sku}
                    </p>

                    <p className="mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-text/60">
                        {a.description}
                    </p>

                    <div className="mt-3">
                        <span className="text-lg sm:text-xl font-bold text-head">
                            ₹{a.basePrice?.sellingPrice}
                        </span>
                    </div>

                </div>

            </Link>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 p-4 pt-0 sm:p-5 sm:pt-0">
                <AddToCart product={a} />

                <button className="rounded-full bg-head py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium text-body hover:opacity-90 transition">
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
