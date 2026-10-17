'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Swipe() {

    return (

        <Swiper modules={[
            Pagination,

            Autoplay
        ]}
            speed={600}
            loop={true}


            pagination={{
                clickable: true
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                pauseOnTouchMove: true,

            }}

            className='w-full aspect-[16/9] '>
            <SwiperSlide >
                <div className="relative w-full aspect-[16/9]">
                    <Image src={"/banner/coupleLow.webp"} alt={'Style'}
                        fill
                        className='object-contain'

                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full aspect-[16/9]">
                    <Image src={'/banner/gerlLow.webp'} alt={'Style'}
                        fill
                        className='object-cover'
                    />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative w-full aspect-[16/9]">
                    <Image src={'/banner/menLow.webp'} alt={'Style'}
                        fill
                        className='object-cover'
                    />

                </div>
            </SwiperSlide>
        </Swiper>
    )
}