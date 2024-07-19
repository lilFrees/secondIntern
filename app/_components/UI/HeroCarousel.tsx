"use client";

import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import Swiper from "swiper";

function HeroCarousel() {
  const ref = useRef<Swiper | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  function handleClickNext() {
    if (ref.current) {
      ref.current.slideNext();
    }
  }

  function handleClickPrev() {
    if (ref.current) {
      ref.current.slidePrev();
    }
  }

  return (
    <div className="relative mt-5">
      <SwiperReact
        slidesPerView={1}
        className="block h-96"
        loop
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-active",
          renderBullet: () =>
            `<div class="inline-block w-6 h-2 rounded-full mx-2 custom-bullet transition-all duration-300 bg-slate-400 cursor-pointer"></div>`,
        }}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        navigation={{
          enabled: true,
          nextEl: nextRef.current,
          prevEl: prevRef.current,
        }}
        onSwiper={(swiper) => {
          ref.current = swiper;
        }}
      >
        <SwiperSlide className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 to-purple-400 text-3xl">
          1
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 to-purple-400 text-3xl">
          2
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 to-purple-400 text-3xl">
          3
        </SwiperSlide>
        <SwiperSlide className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-tr from-purple-700 to-purple-400 text-3xl">
          4
        </SwiperSlide>
      </SwiperReact>
      <button
        ref={prevRef}
        onClick={handleClickPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer select-none"
      >
        <FaCircleChevronLeft className="text-3xl text-white" />
      </button>
      <button
        ref={nextRef}
        onClick={handleClickNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer select-none"
      >
        <FaCircleChevronRight className="text-3xl text-white" />
      </button>
    </div>
  );
}

export default HeroCarousel;
