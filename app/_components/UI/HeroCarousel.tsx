"use client";

import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";

function HeroCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <div className="relative mt-5">
      <Swiper
        slidesPerView={1}
        className="block h-96"
        loop
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-active",
          renderBullet: () =>
            `<div class="inline-block w-6 h-2 rounded-full mx-2 custom-bullet transition-all duration-300 bg-slate-400 cursor-pointer"></div>`,
        }}
        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
      >
        <SwiperSlide className="bg-pink-600 text-center text-3xl">
          1
        </SwiperSlide>
        <SwiperSlide className="bg-pink-600 text-center text-3xl">
          2
        </SwiperSlide>
        <SwiperSlide className="bg-pink-600 text-center text-3xl">
          3
        </SwiperSlide>
        <SwiperSlide className="bg-pink-600 text-center text-3xl">
          4
        </SwiperSlide>
      </Swiper>
      <div
        ref={prevRef}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer"
      >
        <FaCircleChevronLeft className="text-3xl text-white" />
      </div>
      <div
        ref={nextRef}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer"
      >
        <FaCircleChevronRight className="text-3xl text-white" />
      </div>
    </div>
  );
}

export default HeroCarousel;
