
// 'use client'
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image"
// import { Swiper, SwiperSlide } from "swiper/react"
// import { Pagination,Autoplay , Mousewheel ,FreeMode,EffectFade ,EffectCube ,EffectCoverflow,EffectCards} from "swiper/modules";
// // import { Navigation } from "swiper/modules";


// import "swiper/css";
// import "swiper/css/pagination";
// import 'swiper/css/effect-fade'
// import "swiper/css/effect-cards";
// import "swiper/css/effect-cube";;
// import "swiper/css/effect-coverflow";
// import { useRef } from "react";
// export default function Practice (){

//     const images=[
//         "/modelimage.png",
//         "/bag1.jpg",
//         "/shirt.jpg",
//         "/shirt2.jpg",
//         "/shirt3.jpg",
//         "/image.png"
//     ]

//     const swipe= useRef(null)
 

//     return (
//         <div  className="w-[70%] mx-auto flex items-center gap-8 ">
//             <button className="shrink-0" onClick={()=>{
//     swipe.current?.slidePrev()
// }} >
  
                
// <ChevronLeft
// size={50}
// strokeWidth={1}
// />
//                 </button>  
//       {/* <Swiper 
//       modules={[Pagination,Autoplay,FreeMode,Mousewheel ,EffectFade]}
//       slidesPerView={1} effect="fade" spaceBetween={80}
//       freeMode={true}
//       mousewheel={true}
//       initialSlide={3}
//       speed={1500}
//       grabCursor={true}
//       centeredSlides={true}
//     //   centeredSlidesBounds={true}
//       centerInsufficientSlides={true}
//     //   slidesPerGroup={3}
//       autoplay={{
//         delay:3000,
//         pauseOnMouseEnter:true
//       }}
//       loop={true}
//      pagination={{
//         clickable:true,
//         dynamicBullets:true,
//      }}
//      breakpoints={{
//         441:{
//             slidesPerView:1,
            
//         },
//         800:{
//             slidesPerView:2,
//             spaceBetween:20
//         },
//         1024:{
//             slidesPerView:1,
//             spaceBetween:40
//         }
//      }}
//       className="w-full"
//       onSwiper={(swiper)=>{
//         swipe.current=swiper
//       }}
//     //    modules={[Navigation]} navigation
//         > */}




//         <Swiper
//   modules={[Pagination, Autoplay, EffectCube ,EffectCoverflow ,EffectCards]}
//   effect="cards"
//   slidesPerView={1}
//   speed={1000}
//     cardsEffect={{
//     slideShadows: true,
//   }}

// // coverflowEffect={{
// //   rotate: 60,
// //   stretch: 0,
// //   depth: 100,
// //   modifier: 1,
// //   slideShadows: true,
// // }}
// //   cubeEffect={{
// //     shadow: true,
// //     slideShadows: true,
// //     shadowOffset: 20,
// //     shadowScale: 0.8,
// //   }}

//   autoplay={{
//     delay: 3000,
//   }}

//   loop={true}

//   pagination={{
//     clickable: true,
//   }}

//   className="w-[90%]"

//   onSwiper={(swiper) => {
//     swipe.current = swiper;
//   }}
// >
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-black rounded-2xl"></div></SwiperSlide>
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-pink-500 rounded-2xl"></div></SwiperSlide>
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-purple-800 rounded-2xl"></div></SwiperSlide>
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-orange-800 rounded-2xl"></div></SwiperSlide>
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-green-800 rounded-2xl"></div></SwiperSlide>
//         <SwiperSlide><div className="w-full h-[200px] border-4 border-blue-800 rounded-2xl"></div></SwiperSlide>
//       </Swiper>
//          <button  className="shrink-0" onClick={()=>{
            
//     swipe.current?.slideNext()
// }}>

// <ChevronRight
// size={50}
// strokeWidth={1}

// />
//          </button>
       
//         </div>
//     )
// }

"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";

import "swiper/css";

export default function ProductGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/shoe1.jpg",
    "/shoe2.jpg",
    "/shoe3.jpg",
    "/shoe4.jpg",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">

      {/* Main Swiper */}
      <Swiper
        modules={[Thumbs]}
        thumbs={{
          swiper:thumbsSwiper
        }}
        onSlideChange={(val)=>{
           setActiveIndex(val.activeIndex);
          console.log('active value ',val.activeIndex)
        }}
        className="w-full h-[500px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}  >
            <motion.div 
            className="w-full h-full flex border-2 border-black rounded-2xl items-center justify-center">
              <img
                src={image}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>


      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        slidesPerView={4}
        spaceBetween={10}
        className="mt-4 h-24"
        
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            < motion.div
        
            animate={{
    opacity: activeIndex === index ? 1 : 0.5,
  }}
  tran
              whileTap={{ scale: 0.95 }}
              
              className="w-full h-full border rounded-lg overflow-hidden cursor-pointer">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}