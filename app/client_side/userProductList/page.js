
import Image from "next/image";
import Link from "next/link";
import AddToCart from "./buttons";
import connectDb from "@/app/backend/db/db";
import Prod from "@/app/backend/db/productSchema";
import SubCategory from "@/app/backend/db/subCategory";
import Category from "@/app/backend/db/catergory";
import Types from "@/app/backend/db/types";

// =========================================================================
// SERVER DATA FETCHING (Direct DB Query - Fast & No Token Required)
// =========================================================================
async function getProduct(categoryName) {
  try {
    await connectDb();

    // 1. Agar Category filter provide kiya hai URL me:
    if (categoryName) {
      const subCat = await SubCategory.findOne({ name: categoryName }).lean();
      if (!subCat) return [];

      const filteredProducts = await Prod.find({ productType: subCat._id })
        .populate("category")
        .populate("productType")
        .populate("productCategory")
        .lean();

      return JSON.parse(JSON.stringify(filteredProducts || []));
    }

    // 2. Agar koi category filter nahi hai (All products):
    const allProducts = await Prod.find()
      .populate("category")
      .populate("productType")
      .populate("productCategory")
      .lean();

    return JSON.parse(JSON.stringify(allProducts || []));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// =========================================================================
// MAIN SERVER COMPONENT
// =========================================================================
export default async function ClientProduct({ searchParams }) {
  const resolve = await searchParams;
  const productCategory = resolve?.category;

  const product = await getProduct(productCategory);

  return (
    <main className="min-h-screen bg-body px-3 py-5 sm:px-5 md:px-8 lg:px-10">
      {/* Header & Search */}


      {/* Product Grid */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {product.map((a, i) => {
          const slug = a.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          const productUrl = `/client_side/orderPage/${slug}/${a._id}`;

          return (
            <article
              key={a._id || i}
              className="group flex flex-col bg-white rounded-[28px] sm:rounded-[32px] border border-head/20 overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <Link
                href={productUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
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
                    SKU: {a.variants?.[0]?.sizes?.[0]?.sku || "N/A"}
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

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 p-4 pt-0 sm:p-5 sm:pt-0">
                <AddToCart product={a} />

                <Link
                  href={productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-full bg-head py-2 sm:py-2.5 text-[10px] sm:text-sm font-medium text-body hover:opacity-90 transition text-center"
                >
                  Buy Now
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
} 
