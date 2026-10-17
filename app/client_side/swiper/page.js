'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, FreeMode, Mousewheel } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import 'swiper/css/mousewheel'

export default function Banner({ tag = "trending" } = {}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProductsByTag = async () => {
            try {
                let targetTag = tag
                if (typeof tag === "string") {
                    const lower = tag.toLowerCase()
                    if (lower === "newarrival") targetTag = "newArrival"
                    else if (lower === "trending") targetTag = "trending"
                    else if (lower === "bestseller") targetTag = "bestSeller"
                }

                const res = await fetch('/backend/productByCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tag: targetTag }),
                })

                const data = await res.json()
                console.log("Fetched products from API:", data)

                if (data.success && Array.isArray(data.data)) {
                    setProducts(data.data)
                }
            } catch (error) {
                console.error("Failed to fetch products:", error)
            }
        }

        fetchProductsByTag()
    }, [tag])

    return (
        <div className="w-full px-2 sm:px-8 lg:px-12 max-w-[1400px] mx-auto py-4 sm:py-6">
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
                {products.map((item, index) => {
                    const id = item._id || item.id || index
                    const title = item.name || item.title || "Product"
                    const categoryName = item.category?.name || item.productType?.name || "Collection"

                    // Photo variants ke first section (variants[0].images[0]) se
                    const firstVariant = item?.variants?.[0]
                    const firstImg = firstVariant?.images?.[0]
                    const image = (typeof firstImg === 'string' ? firstImg : firstImg?.url) || item?.image || "/arrival/cat/men.png"

                    const price = item.basePrice?.sellingPrice || item.basePrice?.mrp || "1,499"

                    const badge = item.homepageTags?.[0]
                        ? (item.homepageTags[0] === 'newArrival' ? 'New' : item.homepageTags[0])
                        : (tag === 'newArrival' ? 'New' : 'Trending')

                    return (
                        <SwiperSlide key={id}>
                            <div className="group cursor-pointer">
                                {/* Product Image Card matching newArrival mobile height [170px] */}
                                <div className="relative h-[170px] sm:h-[280px] md:h-[360px] lg:h-[450px] w-full rounded-sm overflow-hidden bg-[#e7d8c2]">
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        unoptimized
                                        priority={index < 4}
                                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Tag Badge */}
                                    <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#F1E5D3] px-2 py-0.5 sm:px-3 sm:py-1 text-[8px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] font-medium text-black">
                                        {badge}
                                    </span>

                                    {/* Shop now button on hover */}
                                    <button className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[#2B211B] text-[#F1E5D3] px-2.5 py-1.5 sm:px-5 sm:py-3 text-[8px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] opacity-0 translate-y-2 sm:translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                        Shop now
                                    </button>
                                </div>

                                {/* Content Below Card with responsive sizing */}
                                <div className="pt-2 sm:pt-4 flex justify-between items-start gap-1">
                                    <div className="min-w-0">
                                        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-60 truncate">
                                            {categoryName}
                                        </p>
                                        <h3 className="mt-0.5 sm:mt-1 font-cantata text-xs sm:text-base lg:text-lg truncate">
                                            {title}
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-sm font-cantata font-medium shrink-0 pt-0.5">
                                        ₹{price}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
