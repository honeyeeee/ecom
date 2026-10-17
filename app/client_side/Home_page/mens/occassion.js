import Image from "next/image"
import Link from "next/link"

const mobileOccasions = [
  {
    id: 1,
    title: "Wedding Wear",
    sub: "Royal & festive fits",
    discount: "50% off",
    image: "/modelimage.png",
  },
  {
    id: 2,
    title: "Party Wear",
    sub: "Bold & stylish looks",
    discount: "40% off",
    image: "/shirt4.jpg",
  },
  {
    id: 3,
    title: "Casual & Daily",
    sub: "Everyday comfort fits",
    discount: "30% off",
    image: "/banner/menLow.webp",
  },
]

const desktopOccasions = [
  {
    id: 1,
    title: "Wedding Wear",
    sub: "Royal & festive fits",
    discount: "50% off",
    image: "/modelimage.png",
    span: "row-span-2",
  },
  {
    id: 2,
    title: "Office Formals",
    sub: "Sharp & refined style",
    discount: "40% off",
    image: "/shirt2.jpg",
    span: "",
  },
  {
    id: 3,
    title: "Party Wear",
    sub: "Bold & stylish looks",
    discount: "45% off",
    image: "/shirt4.jpg",
    span: "",
  },
  {
    id: 4,
    title: "Evening Elegance",
    sub: "Statement silhouettes",
    discount: "35% off",
    image: "/banner/menLow.webp",
    span: "row-span-2",
  },
  {
    id: 5,
    title: "Summer Resort",
    sub: "Breezy & light linen",
    discount: "30% off",
    image: "/shirt3.jpg",
    span: "",
  },
  {
    id: 6,
    title: "Casual & Daily",
    sub: "Everyday comfort fits",
    discount: "25% off",
    image: "/shirt.jpg",
    span: "",
  },
]

export default function Occasion() {
  return (
    <section className="w-full pt-1 sm:pt-2 pb-8 sm:pb-12 flex flex-col justify-center bg-body">
      {/* heading */}
      <div className="w-full flex justify-center px-3 sm:px-6 mb-6 sm:mb-8 lg:mb-10">
        <div className="w-full max-w-[95%] sm:max-w-[85%] md:w-[70%] py-4 sm:py-6 px-4 sm:px-8 rounded-2xl bg-bg gap-2 sm:gap-4 flex flex-col items-center justify-center shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cantata uppercase text-body text-center">
            Shop By <span className="text-head">occasion</span>
          </h1>
          <p className="text-body capitalize tracking-[0.1rem] sm:tracking-[0.2rem] text-xs sm:text-sm font-extralight text-center">
            From everyday essentials to special occasions, find the right style for every moment.
          </p>
        </div>
      </div>

      {/* 1. Mobile & Tablet (below lg): 3 Cards in 1 Row */}
      <div className="w-full px-2 sm:px-6 lg:hidden max-w-[1400px] mx-auto">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
          {mobileOccasions.map((item, index) => (
            <div
              key={item.id}
              className="relative h-[180px] sm:h-[300px] md:h-[380px] w-full rounded-sm overflow-hidden group cursor-pointer"
            >
              <Link href="/client_side/userProductList?category=shirts" className="block w-full h-full relative">
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-2.5 sm:p-4 z-10 text-white">
                  <div>
                    <h3 className="text-xs sm:text-lg font-cantata font-bold leading-tight drop-shadow-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-[9px] sm:text-xs text-white/80 capitalize mt-0.5 hidden sm:block truncate">
                      {item.sub}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 sm:gap-2">
                    <span className="text-[9px] sm:text-xs font-cantata font-bold uppercase text-body drop-shadow-sm">
                      Up to {item.discount}
                    </span>
                    <button className="uppercase text-[8px] sm:text-[10px] text-body border border-body/80 w-fit px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm hover:bg-body hover:text-black transition">
                      Shop now
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Desktop & Laptop (lg and above): Original 4x2 Bento Grid */}
      <div className="hidden lg:block w-full px-6 lg:px-12 max-w-[1400px] mx-auto">
        <ul className="w-full h-[520px] xl:h-[580px] grid grid-cols-4 grid-rows-2 gap-4">
          {desktopOccasions.map((item) => (
            <li
              key={item.id}
              className={`w-full h-full rounded-2xl overflow-hidden relative group cursor-pointer bg-[#e7d8c2] shadow-sm ${item.span}`}
            >
              <Link href="/client_side/userProductList?category=shirts" className="block w-full h-full relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 lg:p-5 flex flex-col justify-between text-white z-10">
                  <div>
                    <h3 className="text-base lg:text-xl font-cantata font-bold leading-tight drop-shadow-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 capitalize mt-0.5">
                      {item.sub}
                    </p>
                  </div>

                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs lg:text-sm font-cantata font-bold uppercase text-body drop-shadow-sm">
                      Up to {item.discount}
                    </span>
                    <button className="uppercase text-[10px] lg:text-xs text-body border border-body/80 px-3 py-1 rounded-sm hover:bg-body hover:text-black transition cursor-pointer">
                      Shop now
                    </button>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}