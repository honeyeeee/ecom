"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, Pagination } from "swiper/modules";

import lists from "@/app/store/userUiState";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function Photo({ response }) {
  // DB: variants[].images[] — same as product list page
  const defaultImages = response?.variants?.[0]?.images ?? [];
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [changeImage, setimage] = useState(defaultImages);

  const variant = lists((state) => state.variants);

  useEffect(() => {
    const fromStore = variant?.images;
    if (fromStore?.length) {
      setimage(fromStore);
    } else if (response?.variants?.[0]?.images) {
      setimage(response.variants[0].images);
    }
  }, [variant, response]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* ================= MAIN IMAGE ================= */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full sm:h-[480px] lg:h-[520px] overflow-hidden rounded-[24px] sm:rounded-[28px] border border-custom-border/50 bg-light shadow-sm">
        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-light/80 backdrop-blur-md border border-custom-border/50 text-text transition hover:bg-card hover:scale-105 shadow-sm cursor-pointer"
        >
          <Heart className="h-5 w-5 fill-text/10 text-text" />
        </button>

        <Swiper
          modules={[Navigation, Thumbs, Autoplay, Pagination]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation
          pagination={{
            clickable: true,
            dynamicMainBullets: true,
          }}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            pauseOnMouseEnter: true,
          }}
          loop={false}
          spaceBetween={0}
          className="h-full w-full [&_.swiper-button-prev]:h-9 [&_.swiper-button-prev]:w-9 [&_.swiper-button-prev]:rounded-full [&_.swiper-button-prev]:border [&_.swiper-button-prev]:border-custom-border/60 [&_.swiper-button-prev]:bg-light/80 [&_.swiper-button-prev]:text-text [&_.swiper-button-prev]:backdrop-blur-sm [&_.swiper-button-prev::after]:text-xs [&_.swiper-button-next]:h-9 [&_.swiper-button-next]:w-9 [&_.swiper-button-next]:rounded-full [&_.swiper-button-next]:border [&_.swiper-button-next]:border-custom-border/60 [&_.swiper-button-next]:bg-light/80 [&_.swiper-button-next]:text-text [&_.swiper-button-next]:backdrop-blur-sm [&_.swiper-button-next::after]:text-xs [&_.swiper-pagination-bullet-active]:bg-button [&_.swiper-pagination-bullet]:bg-custom-border"
        >
          {changeImage.map((image, i) => (
            <SwiperSlide key={i} className="h-full w-full">
              <div className="relative h-full w-full flex items-center justify-center p-3 sm:p-4">
                <Image
                  src={image.url}
                  fill
                  alt={`${response?.name || "Product"} image ${i + 1}`}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= THUMBNAILS ================= */}
      {changeImage.length > 1 && (
        <div className="flex w-full justify-start sm:justify-center pt-2">
          <Swiper
            direction="horizontal"
            modules={[Navigation, Thumbs]}
            slidesPerView="auto"
            spaceBetween={16}
            watchSlidesProgress
            onSwiper={setThumbsSwiper}
            className="w-full max-w-lg !py-2 !px-1 [&_.swiper-wrapper]:justify-start sm:[&_.swiper-wrapper]:justify-center [&_.swiper-slide-thumb-active>div]:border-button [&_.swiper-slide-thumb-active>div]:ring-2 [&_.swiper-slide-thumb-active>div]:ring-button/40 [&_.swiper-slide-thumb-active>div]:shadow-sm"
          >
            {changeImage.map((image, i) => (
              <SwiperSlide key={i} className="!w-[76px] sm:!w-[86px] !h-auto">
                <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-custom-border/60 bg-light p-1.5 transition-all duration-200 hover:border-button/80 hover:scale-105">
                  <Image
                    src={image.url}
                    fill
                    alt={`${response?.name || "Product"} thumbnail ${i + 1}`}
                    className="object-contain p-1 rounded-xl"
                    sizes="90px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
