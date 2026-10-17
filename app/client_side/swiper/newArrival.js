'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, FreeMode, Mousewheel } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'

export default function NewArrival(photos) {
    const products = [
        {
            id: 1,
            title: "Everyday Shirts",
            sub: "Upgrade your style",
            discount: "40% off",
            image: "/arrival/cat/men.png"
        },
        {
            id: 2,
            title: "Floral Muse",
            sub: "Soft silhouettes",
            discount: "50% off",
            image: "/arrival/cat/women.png"
        },
        {
            id: 3,
            title: "Quiet Luxury",
            sub: "Details define look",
            discount: "60% off",
            image: "/arrival/cat/accessory.png"
        },
        {
            id: 4,
            title: "Classic Formals",
            sub: "Step into timeless style",
            discount: "30% off",
            image: "/arrival/cat/shoes.png"
        },
        {
            id: 5,
            title: "Women's Collection",
            sub: "Curated modern fits",
            discount: "35% off",
            image: "/cat/women.png"
        },
        {
            id: 6,
            title: "Men's Collection",
            sub: "Effortless elegance",
            discount: "45% off",
            image: "/cat/image.png"
        },
        {
            id: 7,
            title: "Fine Accessories",
            sub: "Statement pieces",
            discount: "25% off",
            image: "/cat/accessoory.png"
        },
        {
            id: 8,
            title: "Kids Collection",
            sub: "Playful everyday wear",
            discount: "50% off",
            image: "/cat/child2.png"
        }
    ];

    return (
        <div className="w-full px-2 sm:px-8 lg:px-12 max-w-[1400px] mx-auto pt-1 pb-2 sm:py-6">
            <Swiper
                modules={[
                    Pagination,
                    Autoplay,
                    FreeMode,
                    Mousewheel
                ]}
                mousewheel={{
                    enabled: true,
                    forceToAxis: false,
                    releaseOnEdges: true,
                    sensitivity: 0.2,
                }}
                freeMode={{
                    enabled: true,
                    sticky: true,
                    momentum: true,
                    momentumBounce: true,
                }}
                speed={600}
                // loop={true}
                slidesPerView={3.2}
                spaceBetween={10}
                breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 16 },
                    1024: { slidesPerView: 4, spaceBetween: 24 },
                }}
                allowTouchMove={true}
                simulateTouch={true}
                grabCursor={true}
                threshold={5}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                //     pauseOnTouchMove: true,
                // }}
                className='w-full pb-6 sm:pb-10'
            >
                {products.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <div className="relative h-[170px] sm:h-[280px] md:h-[360px] lg:h-[450px] w-full rounded-sm overflow-hidden group">
                            {/* Product Image from main page */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                priority={index < 4}
                                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-between p-2.5 sm:p-4 lg:p-6 z-10 text-white">
                                <div>
                                    <h3 className="text-xs sm:text-base lg:text-2xl font-cantata font-bold leading-tight drop-shadow-sm">
                                        {item.title}
                                    </h3>
                                    <p className="text-[10px] sm:text-xs text-white/80 capitalize mt-0.5 hidden sm:block">
                                        {item.sub}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <span className="text-[9px] sm:text-xs lg:text-sm font-cantata font-bold uppercase text-body drop-shadow-sm">
                                        Up to {item.discount}
                                    </span>
                                    <button className="uppercase text-[8px] sm:text-[10px] lg:text-xs text-body border border-body/80 w-fit px-2 py-0.5 sm:px-3 sm:py-1 rounded-sm hover:bg-body hover:text-black transition">
                                        Shop now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
