"use client";

import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef } from "react";
import Swiper from "swiper";

import slide1 from "@/public/slider/slide1.jpg";
import slide2 from "@/public/slider/slide2.jpg";
import slide3 from "@/public/slider/slide3.webp";
import slide4 from "@/public/slider/slide4.jpeg";
import Image from "next/image";

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

  const images = [slide1, slide2, slide3, slide4];

  return (
    <div className="relative mt-5 aspect-[5/2] h-auto w-full">
      <SwiperReact
        slidesPerView={1}
        className="absolute inset-0 block h-full w-full"
        loop
        spaceBetween={5}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-active",
          renderBullet: () =>
            `<div class="inline-block w-6 h-[6px] rounded-full mx-2 custom-bullet transition-all duration-300 bg-slate-400 cursor-pointer"></div>`,
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
        {images.map((img, i) => (
          <SwiperSlide
            key={i}
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl text-3xl"
          >
            <Image
              src={img}
              alt={`Product Image ${i}`}
              fill
              loading="eager"
              className="block object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 100vw"
              quality={100}
              placeholder="blur"
            />
          </SwiperSlide>
        ))}
      </SwiperReact>
      <button
        aria-label="Previous"
        ref={prevRef}
        onClick={handleClickPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer select-none"
      >
        <FaCircleChevronLeft className="text-3xl text-white" />
      </button>
      <button
        aria-label="Next"
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
