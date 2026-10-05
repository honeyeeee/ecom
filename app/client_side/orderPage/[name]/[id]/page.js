
import { cookies } from "next/headers";
import Photo from "../../elements/photo";
import Colors from "../../elements/color";
import Buy from "../../elements/buyButton";
import {
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
} from "lucide-react";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();

  const data = await fetch(`http://localhost:3000/backend/orderProduct/${id}`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const response = await data.json();
  const product = response?.ans;
  const sellingPrice = product?.basePrice?.sellingPrice;
  const mrp = product?.basePrice?.mrp;

  const discountPercent =
    mrp && sellingPrice && mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : null;

  return (
    <main className="min-h-screen bg-body px-3 py-6 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Main Product Card Container */}
        <section className="overflow-hidden rounded-[28px] border border-custom-border/40 bg-body p-4 sm:rounded-[36px] sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Column: Product Gallery */}
            <div className="w-full lg:col-span-6">
              <Photo response={response} />
            </div>

            {/* Right Column: Product Information */}
            <div className="flex w-full flex-col lg:col-span-6 lg:pl-4">
              {/* Badges */}
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

              {/* Product Title */}
              <h1 className="font-cantata text-2xl font-normal tracking-wide text-text sm:text-3xl lg:text-4xl capitalize leading-snug">
                {product?.name || "Product Title"}
              </h1>

              {/* Rating Section */}
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
                <span className="text-head/70">Rating section</span>
              </div>

              {/* Price Row */}
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

              {/* Description */}
              {product?.description && (
                <p className="mt-3 text-sm leading-relaxed text-head/85 sm:text-base">
                  {product.description}
                </p>
              )}

              {/* Features List */}
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

              {/* Color and Size Selector */}
              <Colors response={response} id={id} />

              {/* Quantity & CTA Buttons */}
              <Buy id={id} />
            </div>
          </div>

          {/* Bottom Trust Badges Bar */}
          <div className="mt-10 rounded-2xl border border-custom-border/50 bg-light/60 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-custom-border/40">
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5 px-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <Truck className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Free Delivery</p>
                  <p className="text-xs text-head/70">On orders above ₹999</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5 px-2 lg:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <RotateCcw className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Easy Returns</p>
                  <p className="text-xs text-head/70">7 days return policy</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5 px-2 lg:pl-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card/60 text-head">
                  <ShieldCheck className="h-5 w-5 text-head" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">Secure Payment</p>
                  <p className="text-xs text-head/70">100% secure checkout</p>
                </div>
              </div>

              {/* Feature 4 */}
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


