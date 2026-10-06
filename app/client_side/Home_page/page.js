import { ArrowRightCircle, Truck, Shield, CircleHelpIcon, MessageCircle, Gem, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import Cart from "@/app/backend/db/cart";
import connectDb from "@/app/backend/db/db";
import User from "@/app/backend/db/userSchema";
import CartSync from "./cartSync";

/**
 * SERVER: Logged-in user ka cart MongoDB se load karna
 * Flow: cookie `token` → JWT verify → user exist? → Cart.find + populate product
 * Guest / no token / invalid user → [] (empty cart, error throw nahi)
 */
async function getCartFromDb() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("token")?.value;

    // Login nahi — client par cart empty rehta hai jab tak CartSync [] na bheje
    if (!session) {
      return [];
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(session, secret);

    await connectDb();

    // Token valid hai par user DB mein delete ho gaya ho to cart mat load karo
    const findUser = await User.findById(payload.id, { _id: 1 }).lean();
    if (!findUser) {
      return [];
    }

    // Har line: userId + productId (ref) + quantity; productId populate = drawer UI ke liye detail
    const cart = await Cart.find({ userId: findUser._id })
      .populate(
        "productId",
        "name basePrice variants description Image Name Price"
      )
      .lean();

    if (!cart || cart.length === 0) {
      return [];
    }

    // Server Component → Client (CartSync): plain JSON, ObjectId serialize
    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    // JWT galat / expired / DB error — silently empty cart (console se debug)
    console.log(error);
    return [];
  }
}

export default async function Home() {
  const cartProducts = await getCartFromDb();

  return (
    <>
      {/* DB cart → Zustand (`productList.js`); sirf home mount par sync hota hai abhi */}
      <CartSync cartProducts={cartProducts} />
      <main className="w-full min-h-screen">
        {/* 
          ========================================================================
          HERO BANNER - RESTRUCTURED
          Change Summary:
          - Layout: Changed from absolute-positioned text to natural flex-column layout with padding. This fixes the big empty whitespace below content on mobile/iPad.
          - Image: Kept as absolute fill with object-cover. object-[right_center] on mobile shows model, object-top on desktop/iPad.
          - Section Height: Uses min-h so section grows with content, no fixed large vh.
          - Badges: Placed at bottom using mt-auto so they always stick to the bottom of the content.
          ========================================================================
        */}
        <section className="relative w-full min-h-[520px] sm:min-h-[600px] md:min-h-[680px] lg:min-h-[calc(100vh-80px)] overflow-hidden flex flex-col">

          {/* Background image - fills entire section */}
          <Image
            src="/heroSection/image.png"
            alt="Hero Background"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            className="object-cover object-[right_center] sm:object-[right_top] md:object-[center_top] lg:object-top"
          />

          {/* 
            Hero text & CTA - natural flex column flow with padding (no absolute top offset).
            Change: Using py padding instead of top:xx to fix whitespace on mobile and tablet.
          */}
          <div className="relative z-20 flex flex-col flex-1 px-4 sm:px-10 md:px-14 lg:px-24 py-8 sm:py-12 md:py-14 lg:py-10 max-w-[70%] sm:max-w-[55%] md:max-w-lg lg:max-w-xl">

            {/* Subheading row */}
            <div className="flex gap-3 sm:gap-5 items-center">
              <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-text uppercase font-medium whitespace-nowrap">
                more then fashion
              </p>
              <div className="w-[35px] sm:w-[80px] md:w-[130px] lg:w-[180px] border-t border-black h-0"></div>
            </div>

            {/* Main heading */}
            <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col gap-0.5 sm:gap-1 md:gap-2">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-cantata uppercase leading-tight">
                Define Your
              </h1>
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-cantata uppercase leading-tight">
                Own Style.
              </h1>
              <p className="mt-2 sm:mt-4 md:mt-5 max-w-[190px] sm:max-w-[260px] md:max-w-xs lg:max-w-md text-[11px] sm:text-sm md:text-base lg:text-lg text-text leading-snug font-normal">
                Timeless pieces crafted for effortless everyday elegance, designed to move with your life.
              </p>
            </div>

            {/* Button */}
            <button className="mt-4 sm:mt-6 md:mt-8 lg:mt-8 px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 rounded-full text-body w-fit bg-[#2B211B] hover:bg-[#3A2D24] duration-150 text-xs sm:text-sm md:text-base font-medium shadow-sm">
              Shop Collection →
            </button>

            {/* 
              Badges - mt-auto pushes them to bottom of flex container.
              Change: No longer absolute positioned, stays inside natural flow and won't overlap button.
            */}
            <div className="mt-auto pt-6 sm:pt-8 md:pt-10">
              <ul className="flex items-center gap-3 sm:gap-6 md:gap-8">
                <li>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-2.5">
                    <Gem size={16} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]" strokeWidth={1} />
                    <span className="uppercase text-[8px] sm:text-[10px] md:text-xs tracking-wider">Fast delivery</span>
                  </div>
                </li>

                <div className="h-[26px] sm:h-[38px] md:h-[44px] border-l border-black"></div>

                <li>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-2.5">
                    <Leaf size={16} className="sm:w-[20px] sm:h-[20px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px]" strokeWidth={1} />
                    <span className="uppercase text-[8px] sm:text-[10px] md:text-xs tracking-wider">Sustainable</span>
                  </div>
                </li>

                <div className="h-[26px] sm:h-[38px] md:h-[44px] border-l border-black"></div>

                <li>
                  <div className="flex flex-col items-center gap-1 sm:gap-2 md:gap-2.5">
                    <Truck size={15} className="sm:w-[19px] sm:h-[19px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]" strokeWidth={1} />
                    <span className="uppercase text-[8px] sm:text-[10px] md:text-xs tracking-wider">Free shipping</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* 
          ========================================================================
          CATEGORY SECTION
          Change Summary:
          - Replaced fixed width/height container and flex layout with responsive CSS Grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4).
          - Added responsive padding (px-4 sm:px-10 lg:px-20) and fluid font sizes (text-2xl sm:text-3xl lg:text-4xl).
          ========================================================================
        */}
        <section className="bg-[#F1E5D3] py-8 sm:py-12 lg:py-16">

          {/* Heading - compact on mobile/tablet */}
          <div className="px-4 sm:px-8 lg:px-20 flex flex-col gap-2 justify-center items-center text-center">

            <div className="flex gap-3 sm:gap-8 items-center mb-1 sm:mb-2">
              <div className="w-[28px] sm:w-[100px] border-t border-black h-0"></div>
              <h1 className="uppercase text-[10px] sm:text-sm tracking-wider">shop By Category</h1>
              <div className="w-[28px] sm:w-[100px] border-t border-black h-0"></div>
            </div>

            <div className="flex flex-col justify-center items-center w-full lg:w-[45%]">
              <h1 className="text-lg sm:text-2xl lg:text-4xl text-text font-cantata font-bold capitalize leading-tight">
                for you and your & your loved ones
              </h1>
            </div>

            <p className="mt-1 text-text/70 text-xs sm:text-sm lg:text-base w-full sm:w-[90%] lg:w-[45%] leading-relaxed text-center hidden sm:block">
              Thoughtfully curated styles for every moment, every mood, and everyone you love.
            </p>

          </div>

          {/* Category Cards - one row flex on mobile & iPad; grid on desktop */}
          <nav className="pt-4 sm:pt-6">
            <ul className="flex flex-row flex-nowrap gap-2 sm:gap-3 md:gap-4 px-3 sm:px-8 lg:px-20 mt-4 sm:mt-6 lg:grid lg:grid-cols-4 lg:gap-6">

              {/* Women */}
              <li className="relative flex-1 min-w-0 basis-0 h-[120px] sm:h-[160px] md:h-[200px] lg:h-[300px] overflow-hidden group rounded-sm sm:rounded-none">
                <Image
                  src="/cat/women.png"
                  alt="Women Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <Link
                  href="/c"
                  className="absolute inset-0 w-full h-full flex items-end p-2 sm:p-4 lg:p-6 z-10 bg-black/10"
                >
                  <div className="flex justify-between items-end w-full gap-1">
                    <div className="min-w-0">
                      <span className="text-xs sm:text-lg lg:text-2xl font-cantata text-white block truncate">
                        Women
                      </span>
                      <h1 className="uppercase tracking-wide text-[8px] sm:text-xs text-body hidden sm:block">explore more</h1>
                    </div>
                    <ArrowRightCircle className="text-body w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 shrink-0 hidden sm:block" strokeWidth={1} />
                  </div>
                </Link>
              </li>

              {/* Men */}
              <li className="relative flex-1 min-w-0 basis-0 h-[120px] sm:h-[160px] md:h-[200px] lg:h-[300px] overflow-hidden group rounded-sm sm:rounded-none">
                <Image
                  src="/cat/image.png"
                  alt="Men Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <Link
                  href="/client_side/Home_page/mens"
                  className="absolute inset-0 w-full h-full flex items-end p-2 sm:p-4 lg:p-6 z-10 bg-black/10"
                >
                  <div className="flex justify-between items-end w-full gap-1">
                    <div className="min-w-0">
                      <span className="text-xs sm:text-lg lg:text-2xl font-cantata text-white block truncate">
                        Men
                      </span>
                      <h1 className="uppercase tracking-wide text-[8px] sm:text-xs text-body hidden sm:block">explore more</h1>
                    </div>
                    <ArrowRightCircle className="text-body w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 shrink-0 hidden sm:block" strokeWidth={1} />
                  </div>
                </Link>
              </li>

              {/* Accessories */}
              <li className="relative flex-1 min-w-0 basis-0 h-[120px] sm:h-[160px] md:h-[200px] lg:h-[300px] overflow-hidden group rounded-sm sm:rounded-none">
                <Image
                  src="/cat/accessoory.png"
                  alt="Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <Link
                  href="/c"
                  className="absolute inset-0 w-full h-full flex items-end p-2 sm:p-4 lg:p-6 z-10 bg-black/10"
                >
                  <div className="flex justify-between items-end w-full gap-1">
                    <div className="min-w-0">
                      <span className="text-[9px] sm:text-lg lg:text-2xl font-cantata text-white block leading-tight">
                        Accessories
                      </span>
                      <h1 className="uppercase tracking-wide text-[8px] sm:text-xs text-body hidden sm:block">explore more</h1>
                    </div>
                    <ArrowRightCircle className="text-body w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 shrink-0 hidden sm:block" strokeWidth={1} />
                  </div>
                </Link>
              </li>

              {/* Kids */}
              <li className="relative flex-1 min-w-0 basis-0 h-[120px] sm:h-[160px] md:h-[200px] lg:h-[300px] overflow-hidden group rounded-sm sm:rounded-none">
                <Image
                  src="/cat/child2.png"
                  alt="Kids Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <Link
                  href="/c"
                  className="absolute inset-0 w-full h-full flex items-end p-2 sm:p-4 lg:p-6 z-10 bg-black/10"
                >
                  <div className="flex justify-between items-end w-full gap-1">
                    <div className="min-w-0">
                      <span className="text-xs sm:text-lg lg:text-2xl font-cantata text-white block truncate">
                        Kids
                      </span>
                      <h1 className="uppercase tracking-wide text-[8px] sm:text-xs text-body hidden sm:block">explore more</h1>
                    </div>
                    <ArrowRightCircle className="text-body w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 shrink-0 hidden sm:block" strokeWidth={1} />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

        </section>


        {/* 
          ========================================================================
          NEW ARRIVALS SECTION
          Change Summary:
          - Replaced fixed `h-screen overflow-hidden` with `min-h-screen py-12 sm:py-16` so content doesn't get cut off on mobile.
          - Made product cards responsive with grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4).
          - Adjusted typography and spacing for clean mobile & tablet presentation.
          ========================================================================
        */}
        <section className="min-h-screen py-12 sm:py-16 bg-body">
          <div className="h-full w-full flex flex-col gap-8">

            {/* Header / Subheadings */}
            <div className="w-full px-4 sm:px-8">
              <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center">

                {/* Sub heading */}
                <div className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-[40px] sm:w-[100px] h-0 border-t border-black"></div>
                  <div className="font-extralight tracking-[0.15em] sm:tracking-[0.2rem] text-xs sm:text-base lg:text-xl uppercase text-center">
                    Shop trendy styles metters daily life
                  </div>
                  <div className="w-[40px] sm:w-[100px] h-0 border-t border-black"></div>
                </div>

                {/* Main heading */}
                <div className="w-full flex flex-col justify-center items-center gap-3 sm:gap-4">
                  <div className="uppercase text-3xl sm:text-4xl lg:text-5xl tracking-[0.15em] sm:tracking-[0.2rem] font-cantata font-bold text-center">
                    New <span className="text-head">Arrivals</span>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <p className="text-center w-full sm:w-[80%] lg:w-[40%] font-light text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.3rem]">
                      live bright with trendy products that caterd daliy need at minimum price live life long
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Banner / Product Grid - responsive columns */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">

              {/* Product 1 */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden group">
                <Image
                  src="/arrival/cat/men.png"
                  fill
                  alt="Everyday Shirts"
                  className="object-center object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text section */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 z-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-cantata capitalize font-extrabold">
                      everyday <br /> <span className="font-light">Shirts</span>
                    </h1>
                    <p className="w-full max-w-[200px] capitalize text-xs sm:text-sm">
                      upgrade your everyday style
                    </p>
                    <div className="font-light border-[0.02rem] border-black w-[20%] h-0"></div>
                  </div>

                  {/* Bottom CTA text */}
                  <div className="flex flex-col gap-3">
                    <h1 className="uppercase text-xs sm:text-sm text-body font-cantata flex flex-col gap-1">
                      Up to <br />
                      <span className="text-lg sm:text-xl font-bold">40% off</span>
                    </h1>
                    <button className="uppercase text-xs sm:text-sm text-body border-2 border-body w-fit h-fit px-4 py-1 hover:bg-body hover:text-black transition">
                      shop now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden group">
                <Image
                  src="/arrival/cat/women.png"
                  fill
                  alt="Floral Muse"
                  className="object-center object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text section */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 z-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-cantata capitalize font-extrabold">
                      Floral <br /> <span className="font-light">Muse</span>
                    </h1>
                    <p className="w-full max-w-[200px] capitalize text-xs sm:text-sm">
                      Soft silhouettes, bold presence
                    </p>
                    <div className="font-light border-[0.02rem] border-black w-[20%] h-0"></div>
                  </div>

                  {/* Bottom CTA text */}
                  <div className="flex flex-col gap-3">
                    <h1 className="uppercase text-xs sm:text-sm text-body font-cantata flex flex-col gap-1">
                      Up to <br />
                      <span className="text-lg sm:text-xl font-bold">50% off</span>
                    </h1>
                    <button className="uppercase text-xs sm:text-sm text-body border-2 border-body w-fit h-fit px-4 py-1 hover:bg-body hover:text-black transition">
                      shop now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3 */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden group">
                <Image
                  src="/arrival/cat/accessory.png"
                  fill
                  alt="Quiet Luxury"
                  className="object-center object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text section */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 z-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-cantata capitalize font-extrabold">
                      Quiet <br /> <span className="font-light">Luxury</span>
                    </h1>
                    <p className="w-full max-w-[200px] capitalize text-xs sm:text-sm">
                      Details that define your look
                    </p>
                    <div className="font-light border-[0.02rem] border-black w-[20%] h-0"></div>
                  </div>

                  {/* Bottom CTA text */}
                  <div className="flex flex-col gap-3">
                    <h1 className="uppercase text-xs sm:text-sm text-body font-cantata flex flex-col gap-1">
                      Up to <br />
                      <span className="text-lg sm:text-xl font-bold">60% off</span>
                    </h1>
                    <button className="uppercase text-xs sm:text-sm text-body border-2 border-body w-fit h-fit px-4 py-1 hover:bg-body hover:text-black transition">
                      shop now
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 4 */}
              <div className="relative h-[380px] sm:h-[420px] lg:h-[450px] w-full overflow-hidden group">
                <Image
                  src="/arrival/cat/shoes.png"
                  fill
                  alt="Classic Formals"
                  className="object-center object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 to-transparent" />

                {/* Text section */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 z-10">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-cantata capitalize font-extrabold">
                      classic <br /> <span className="font-light">formals</span>
                    </h1>
                    <p className="w-full max-w-[200px] capitalize text-xs sm:text-sm">
                      Step into timeless style
                    </p>
                    <div className="font-light border-[0.02rem] border-black w-[20%] h-0"></div>
                  </div>

                  {/* Bottom CTA text */}
                  <div className="flex flex-col gap-3">
                    <h1 className="uppercase text-xs sm:text-sm text-body font-cantata flex flex-col gap-1">
                      Up to <br />
                      <span className="text-lg sm:text-xl font-bold">30% off</span>
                    </h1>
                    <button className="uppercase text-xs sm:text-sm text-body border-2 border-body w-fit h-fit px-4 py-1 hover:bg-body hover:text-black transition">
                      shop now
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* 
          ========================================================================
          TRENDING NOW / SALE SECTION
          Change Summary:
          - Converted fixed 4-column product grid to responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4).
          - Made heading lines, margins, and card heights responsive across mobile/tablet/desktop.
          ========================================================================
        */}
        <section className="bg-[#F1E5D3] py-12 sm:py-16">

          {/* Heading */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 mb-10 sm:mb-14">

            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-[50px] sm:w-[120px] lg:w-[200px] border-t border-black" />
              <p className="uppercase tracking-[0.15em] sm:tracking-[0.25em] text-sm sm:text-lg lg:text-xl font-extralight text-center">
                Curated for you
              </p>
              <div className="w-[50px] sm:w-[120px] lg:w-[200px] border-t border-black" />
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="uppercase font-cantata text-3xl sm:text-4xl lg:text-5xl text-head tracking-[0.12em]">
                Trending <span className="text-black font-light">Now</span>
              </h2>

              <p className="mt-3 sm:mt-4 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-light">
                Styles making an impression this season.
              </p>
            </div>

          </div>

          {/* Products Grid - responsive 1, 2, 4 columns */}
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="group">
              <div className="relative h-[340px] sm:h-[380px] lg:h-[430px] overflow-hidden bg-[#e7d8c2]">
                <img
                  src="/products/product1.png"
                  alt="Product"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  Trending
                </span>

                <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Add to bag
                </button>
              </div>

              <div className="pt-5 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Men
                  </p>
                  <h3 className="mt-2 font-cantata text-base sm:text-lg">
                    Relaxed Overshirt
                  </h3>
                </div>

                <p className="text-sm">
                  ₹1,499
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="relative h-[340px] sm:h-[380px] lg:h-[430px] overflow-hidden bg-[#e7d8c2]">
                <img
                  src="/products/product2.png"
                  alt="Product"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  Bestseller
                </span>

                <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Add to bag
                </button>
              </div>

              <div className="pt-5 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Women
                  </p>
                  <h3 className="mt-2 font-cantata text-base sm:text-lg">
                    Soft Knit Top
                  </h3>
                </div>

                <p className="text-sm">
                  ₹1,299
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group">
              <div className="relative h-[340px] sm:h-[380px] lg:h-[430px] overflow-hidden bg-[#e7d8c2]">
                <img
                  src="/products/product3.png"
                  alt="Product"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  New
                </span>

                <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Add to bag
                </button>
              </div>

              <div className="pt-5 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Accessories
                  </p>
                  <h3 className="mt-2 font-cantata text-base sm:text-lg">
                    Minimal Watch
                  </h3>
                </div>

                <p className="text-sm">
                  ₹2,499
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group">
              <div className="relative h-[340px] sm:h-[380px] lg:h-[430px] overflow-hidden bg-[#e7d8c2]">
                <img
                  src="/products/product4.png"
                  alt="Product"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute top-4 left-4 bg-[#F1E5D3] px-3 py-1 text-[10px] uppercase tracking-[0.15em]">
                  Popular
                </span>

                <button className="absolute bottom-4 right-4 bg-[#2B211B] text-[#F1E5D3] px-5 py-3 text-xs uppercase tracking-[0.15em] opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Add to bag
                </button>
              </div>

              <div className="pt-5 flex justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Footwear
                  </p>
                  <h3 className="mt-2 font-cantata text-base sm:text-lg">
                    Classic Sneakers
                  </h3>
                </div>

                <p className="text-sm">
                  ₹1,899
                </p>
              </div>
            </div>

          </div>

        </section>

        <section>
        </section>

      </main>
    </>
  );
}