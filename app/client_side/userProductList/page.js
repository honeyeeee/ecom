
import Image from "next/image";
import { cookies } from "next/headers";
// import Buttons from "@/app/frontend/admin/productlist/actions/actions";
import AddToCart from "./buttons";
const cookeStore = await cookies()
const token = cookeStore.get('token')
async function getProduct(params) {
  
  const response = await fetch("http://localhost:3000/backend/produtlist",{
    headers:{
      Cookie:token.value
    }
  });
      const data = await response.json();
      console.log(data)
console.log('frontend cookies', cookeStore.get('token'))
// console.log( 'forntend cookie mili',cookieStore.getAll())
return data.ans
}




export default  async function ClientProduct() {
const product = await getProduct()

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
    <button
      className="relative h-11 w-11 shrink-0 rounded-xl bg-button text-white flex items-center justify-center hover:opacity-90 transition"
    >
      🛒

      {/* Cart Count */}
      <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
        0
      </span>
    </button>

  </div>
</div>
      </div>

      {/* Product Grid */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">

        {product.map((a, i) => {
          return (
            <article
              key={a._id || i}
              className="bg-white rounded-xl sm:rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition duration-200"
            >

              {/* Product Image */}
              <div className="relative w-full aspect-square bg-light overflow-hidden">

                <Image
                  src={a.Image[0]}
                  fill
                  className="object-contain p-2 sm:p-4 transition duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  alt={a.Name || "Product Image"}
                />

                {/* Category */}
                {a.Category && (
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 text-[9px] sm:text-xs font-medium bg-white/90 text-text px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                    {a.Category}
                  </span>
                )}

              </div>

              {/* Product Info */}
              <div className="p-2.5 sm:p-3">

                {/* Name */}
                <h2 className="text-sm sm:text-base font-semibold text-text line-clamp-2 min-h-[40px]">
                  {a.Name}
                </h2>

                {/* Price */}
                <div className="mt-1.5 sm:mt-2">
                  <span className="text-base sm:text-lg font-bold text-button">
                    ₹{a.Price}
                  </span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3">

                  <AddToCart product={a}   />

                  <button className="py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium rounded-lg bg-button text-white hover:opacity-90 transition">
                    Buy Now
                  </button>

                </div>

              </div>
                
            </article>
          );
        })}
           
           
      </section>
    </main>
  );
}