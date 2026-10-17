import { ArrowRightCircle, Truck, Shield, CircleHelpIcon, MessageCircle, Gem, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import connectDb from "@/app/backend/db/db";
import Prod from "@/app/backend/db/productSchema";
import searchStore from "@/app/store/search";
import CartSync from "./cartSync";
import Banner from "../swiper/banner";
import NewArrival from "../swiper/newArrival";
import Trending from "../swiper/trending";


export default async function Home() {
  // data fetching for search database not by api

  // fetch req to backend 


  return (
    <>
      {/* cart sync to update the cart count in the navbar
    every time the page is loaded, the cart count is updated
    */}
      <CartSync />
      <main className="w-full min-h-screen">
        {/* Banner Swiper Section */}
        <Banner />



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
        <section className="py-8 sm:py-16 bg-body">
          <div className="w-full flex flex-col gap-4 sm:gap-8">

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
            {/* New Arrivals Swiper Carousel */}
            <NewArrival />


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

          {/* Trending Products Swiper Carousel */}
          <Trending />

        </section>

        <section>
        </section>

      </main>
    </>
  );
}