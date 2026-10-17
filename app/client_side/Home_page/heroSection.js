import Image from "next/image";
import { Gem, Leaf, Truck } from "lucide-react";

export default function HeroSection() {
  return (
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
  );
}
