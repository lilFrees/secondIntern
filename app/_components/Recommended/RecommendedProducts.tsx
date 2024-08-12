"use client";

import { IProduct } from "@/app/_interfaces/IProduct";
import ProductCard from "../UI/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import useCart from "@/app/_hooks/useCart";
import useWishlist from "@/app/_hooks/useWishlist";

function RecommendedProducts({ recommended }: { recommended: IProduct[] }) {
  const { cartIdArray } = useCart();
  const { wishlistIdArray } = useWishlist();
  return (
    <div>
      <Swiper
        slidesPerView={5}
        spaceBetween={50}
        loop={recommended.length > 4}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        modules={[Autoplay]}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {recommended.map((prod, i) => (
          <SwiperSlide key={i}>
            <ProductCard
              prod={prod}
              isInCart={cartIdArray.includes(prod.id)}
              isInWishlist={wishlistIdArray.includes(prod.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default RecommendedProducts;
