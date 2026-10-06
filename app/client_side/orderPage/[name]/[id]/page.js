
// =========================================================================
// 1. IMPORTS & DEPENDENCIES
// =========================================================================
import { cookies } from "next/headers";
import Photo from "../../elements/photo";
import Colors from "../../elements/color";
import Buy from "../../elements/buyButton";
import Prod from "@/app/backend/db/productSchema";
import connectDb from "@/app/backend/db/db";

import {
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default async function ProductPage({ params }) {
  // =======================================================================
  // 2. DATA FETCHING & PARAMS EXTRACTION
  // =======================================================================
  const { id } = await params;
  const cookieStore = await cookies();

  // Database Connection & Product Query with Population
  await connectDb();
  const response = await Prod.findById(id)
    .populate("productType")
    .populate("productCategory")
    .populate("category")
    .lean();

  // Convert to serializable plain JSON object (removes Mongoose ObjectIds/circular refs)
  const product = JSON.parse(JSON.stringify(response));

  // =======================================================================
  // 3. PRICING & DISCOUNT CALCULATIONS
  // =======================================================================
  const sellingPrice = product?.basePrice?.sellingPrice;
  const mrp = product?.basePrice?.mrp;

  const discountPercent =
    mrp && sellingPrice && mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : null;

  return (
    <main className="min-h-screen bg-body px-3 py-6 sm:px-6 sm:py-10 lg:px-10">

      
      <div className="mx-auto w-full max-w-7xl">
        {/* ================================================================= */}
        {/* 4. MAIN PRODUCT CARD CONTAINER */}
        {/* ================================================================= */}
        <section className="overflow-hidden rounded-[28px] border border-custom-border/40 bg-body p-4 sm:rounded-[36px] sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">

            {/* ------------------------------------------------------------- */}
            {/* SECTION A: LEFT COLUMN (PRODUCT IMAGE GALLERY / SWIPER)       */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full lg:col-span-6">
              <Photo response={product} />
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SECTION B: RIGHT COLUMN (PRODUCT DETAILS & ACTIONS)           */}
            {/* ------------------------------------------------------------- */}
            <div className="flex w-full flex-col lg:col-span-6 lg:pl-4">

              {/* [B.1] Badges & Tags (e.g., New Arrival, Trending, Category) */}
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                {product?.homepageTags?.[0] ? (
                  <span className="rounded-full bg-button px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-light sm:text-[11px]">
                    {product.homepageTags[0].replace(/([A-Z])/g, " $1")}
                  </span>
                ) : (
                  <span className="rounded-full bg-button px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-light sm:text-[11px]">
                    New Arrival
                  </span>
                )}

                {product?.productType?.name && (
                  <span className="rounded-full border border-custom-border/60 bg-card/60 px-3.5 py-1 text-[10px] font-medium uppercase tracking-wider text-head sm:text-[11px]">
                    {product.productType.name}
                  </span>
                )}
              </div>

              {/* [B.2] Product Title / Name */}
              <h1 className="font-cantata text-2xl font-normal tracking-wide text-text sm:text-3xl lg:text-4xl capitalize leading-snug">
                {product?.name || "Product Title"}
              </h1>

              {/* [B.3] Rating & Reviews Section */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-head">
                <div className="flex items-center gap-1 text-button">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-button text-button"
                    />
                  ))}
                </div>
                <span className="font-medium">4.8 (120 reviews)</span>
                <span className="text-custom-border">|</span>
                <span className="text-head/70">Verified Customer Ratings</span>
              </div>

              {/* [B.4] Price Section (Selling Price, MRP, Discount %) */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="font-poppins text-3xl font-bold tracking-tight text-text sm:text-4xl">
                  {sellingPrice != null ? `₹${sellingPrice}` : "—"}
                </span>

                {mrp != null && mrp > sellingPrice && (
                  <span className="text-lg font-normal line-through text-muted/60 sm:text-xl">
                    ₹{mrp}
                  </span>
                )}

                {discountPercent != null && discountPercent > 0 && (
                  <span className="rounded-full bg-accent px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-text">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* [B.5] Product Description */}
              {product?.description && (
                <p className="mt-3 text-sm leading-relaxed text-head/85 sm:text-base">
                  {product.description}
                </p>
              )}

              {/* [B.6] Key Features / Highlights */}
              {product?.features?.length > 0 ? (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-head sm:text-sm">
                  {product.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-full bg-light/70 px-3 py-1.5 border border-custom-border/30"
                    >
                      <Check className="h-4 w-4 text-button" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-head sm:text-sm">
                  <div className="flex items-center gap-1.5 rounded-full bg-light/70 px-3 py-1.5 border border-custom-border/30">
                    <Check className="h-4 w-4 text-button" />
                    <span>100% Cotton</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-light/70 px-3 py-1.5 border border-custom-border/30">
                    <Check className="h-4 w-4 text-button" />
                    <span>Skin friendly</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-light/70 px-3 py-1.5 border border-custom-border/30">
                    <Check className="h-4 w-4 text-button" />
                    <span>Light weight</span>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="my-5 w-full border-t border-custom-border/40"></div>

              {/* [B.7] Color & Size Variants Selector */}
              <Colors response={product} id={id} />

              {/* [B.8] Quantity Selector & Action Buttons (Buy Now & Add to Cart) */}
              <Buy id={id} />
            </div>
          </div>

          {/* --------------------------------------------------------------- */}
          {/* SECTION C: BOTTOM TRUST & ASSURANCE BADGES                      */}
          {/* --------------------------------------------------------------- */}
          <div className="mt-10 rounded-2xl border border-custom-border/50 bg-light/60 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-custom-border/40">

              {/* C.1 Free Delivery */}
              <div className="flex items-center gap-3.5 px-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <Truck className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Free Delivery</p>
                  <p className="text-xs text-head/70">On orders above ₹999</p>
                </div>
              </div>

              {/* C.2 Easy Returns */}
              <div className="flex items-center gap-3.5 px-2 lg:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <RotateCcw className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Easy Returns</p>
                  <p className="text-xs text-head/70">7 days return policy</p>
                </div>
              </div>

              {/* C.3 Secure Payment */}
              <div className="flex items-center gap-3.5 px-2 lg:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <ShieldCheck className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Secure Payment</p>
                  <p className="text-xs text-head/70">100% secure checkout</p>
                </div>
              </div>

              {/* C.4 24/7 Customer Support */}
              <div className="flex items-center gap-3.5 px-2 lg:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <Headphones className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">24/7 Support</p>
                  <p className="text-xs text-head/70">We&apos;re here to help</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


