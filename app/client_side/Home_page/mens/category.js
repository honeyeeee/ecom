import { ArrowRightCircle } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "T-Shirts", href: null },
  { name: "Shirts", href: "/client_side/userProductList?category=shirts" },
  { name: "Trousers", href: null },
  { name: "Jackets", href: null },
  { name: "Cargo", href: null },
  { name: "Swaters", href: null },
  { name: "Accessorie's", href: null },
  { name: "Blazer's", href: null },
]

export default function Category() {
  return (
    <section className="bg-[#F1E5D3] pt-4 sm:pt-6 pb-2 sm:pb-4">

      {/* Heading */}
      <div className="pt-2 px-3 sm:px-6 md:px-12 lg:px-20 flex flex-col gap-2 sm:gap-3 justify-center items-center">

        <div className="flex gap-3 sm:gap-6 md:gap-8 items-center mb-1">

          <div className="w-8 sm:w-16 md:w-[100px] border border-black h-0"></div>

          <h1 className="uppercase tracking-[0.15rem] text-xs sm:text-sm whitespace-nowrap">
            Men's Collection
          </h1>

          <div className="w-8 sm:w-16 md:w-[100px] border border-black h-0"></div>

        </div>

        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-text font-cantata font-bold capitalize text-center">
            explore men's collection
          </h1>
        </div>

        <p className="mt-1 text-text/70 text-xs sm:text-sm md:text-base w-full max-w-[92%] sm:max-w-[80%] md:w-[65%] lg:w-[45%] leading-relaxed text-center">
          Discover timeless styles crafted for every occasion, from everyday
          essentials to refined statement pieces.
        </p>

      </div>

      {/* Sub Categories: 4 boxes in 1 row across mobile, iPad/tablet, and desktop */}
      <nav className="pt-3 sm:pt-4 md:pt-6 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-20">

        <ul className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">

          {categories.map((cat, idx) => {
            const content = (
              <div className="absolute inset-0 flex items-end p-2 sm:p-3 md:p-4 lg:p-6 bg-black/10 group-hover:bg-black/20 transition-colors">
                <div className="flex justify-between items-end w-full gap-1">
                  <span className="text-[11px] sm:text-base md:text-xl lg:text-2xl font-cantata text-white block leading-tight truncate min-w-0">
                    {cat.name}
                  </span>

                  <ArrowRightCircle
                    className="text-body w-3.5 h-3.5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-11 lg:h-11 shrink-0"
                    strokeWidth={1}
                  />
                </div>
              </div>
            )

            return (
              <li
                key={idx}
                className="relative w-full aspect-square sm:aspect-auto sm:h-[150px] md:h-[180px] lg:h-[200px] cursor-pointer overflow-hidden group bg-[#B8A991]"
              >
                {cat.href ? (
                  <Link href={cat.href} className="block w-full h-full">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            )
          })}

        </ul>

      </nav>

    </section>
  )
}