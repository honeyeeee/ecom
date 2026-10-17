import Trending from "@/app/client_side/swiper/trending"

export default function Collection() {
  return (
    <section className="w-full pt-2 sm:pt-4 pb-0 sm:pb-2 flex flex-col justify-center bg-body">
      {/* heading */}
      <div className="w-full flex justify-center px-3 sm:px-6 mb-4 sm:mb-8">
        <div className="w-full max-w-[95%] sm:max-w-[85%] md:w-[70%] py-4 sm:py-6 px-4 sm:px-8 rounded-2xl bg-bg gap-2 sm:gap-4 flex flex-col items-center justify-center shadow-sm">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-cantata uppercase text-body text-center">
            best <span className="text-head">collection</span>
          </h1>
          <p className="text-body capitalize tracking-[0.1rem] sm:tracking-[0.2rem] text-xs sm:text-sm font-extralight text-center">
            Discover our finest picks, thoughtfully selected for your wardrobe.
          </p>
        </div>
      </div>

      {/* trending swiper cards */}
      <div className="w-full">
        <Trending tag="trending" />
      </div>
    </section>
  )
}