"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs,Autoplay,Pagination } from "swiper/modules";

// import lists from "@/app/store/userUiState";
import lists from "@/app/store/userUiState";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
// import { immer } from "zustand/middleware/immer";

export default function Photo({ response }) {
  // const varaintImage = lists((state)=>state.variants)
  const images = response.ans.variants[0].image;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [changeImage,setimage] = useState(images)

  const variant = lists((state)=>state.variants)
  console.log('photo variants form photo.js',variant)
  useEffect(()=>{
    const fullImage = variant ? variant?.image:images
    setimage(fullImage)
  },[variant,images])

  
  
  
  


  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-3 sm:p-4">

      {/* ================= THUMBNAILS ================= */}
      <div className="order-2 h-[98px] w-full">
        <Swiper
          direction="horizontal"
          modules={[Navigation, Thumbs ]}
          
          navigation
          slidesPerView={4}
          spaceBetween={8}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          className="w-full h-full object-contain "
        >
          {changeImage.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[90px] rounded-2xl overflow-hidden border-2 border-black cursor-pointer">
                <Image
                  src={image.url}
                  fill
                  alt={`${response.ans.name} image ${i + 1}`}
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= MAIN IMAGE ================= */}
      <div className="order-1 h-0 min-h-0 w-full flex-1">
        <Swiper
        
          modules={[Navigation, Thumbs,Autoplay , Pagination]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed
                ? thumbsSwiper
                : null,
          }}
          navigation
          pagination={{
            clickable:true,
            dynamicMainBullets:true,

          }}
          slidesPerView={1}
          autoplay={{
            delay:6000,
            pauseOnMouseEnter:true
          }}
          loop={true}
          spaceBetween={4}
          className="w-full h-full"
        >
          {changeImage.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={image.url}
                  fill
                  alt={`${response.ans.name} image ${i + 1}`}
                  className="object-contain"
                  sizes="(max-width: 768px) 80vw, 60vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
