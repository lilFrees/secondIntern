"use client";

import { IProduct } from "@/app/_features/product/interfaces/IProduct";

import { IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi2";
import StarRating from "../../../_shared/components/StarRating";
import { addItemToWishlist, removeItemFromWishlist } from "../../favorites/services/wishlist-service";
import { addItemToCart, removeItemFromCart } from "../../cart/services/cart-service";

const ProductCard = memo(function ProductCard({
  prod,
  isInCart,
  isInWishlist,
}: {
  prod: IProduct;
  isInCart: boolean;
  isInWishlist: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-300 bg-white p-3">
      <div className="relative h-40 w-full">
        <Image
          className="object-contain"
          fill
          src={prod.thumbnail}
          alt="product thumbnail"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <Link
        href={"/products/" + prod.id}
        className="line-clamp-1 font-bold"
        title={prod.title}
      >
        {prod.title}
      </Link>
      <div className="flex items-center gap-2">
        <StarRating rating={prod.rating} />
        <div className="text-xs text-gray-500">
          {prod.reviews.length} {prod.reviews.length > 1 ? "reviews" : "review"}
        </div>
      </div>
      <div className="text-sm">In stock: {prod.stock}</div>
      <div className="mt-auto flex items-center justify-between">
        <div className="text-lg">$ {prod.price}</div>
        <div className="flex items-center gap-2">
          <IconButton
            icon={isInWishlist ? <FaHeart /> : <FaRegHeart />}
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme="green"
            onClick={() => {
              isInWishlist
                ? removeItemFromWishlist(prod.id)
                : addItemToWishlist(prod.id);
            }}
          ></IconButton>
          <IconButton
            icon={isInCart ? <HiShoppingCart /> : <HiOutlineShoppingCart />}
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme="green"
            onClick={() => {
              isInCart ? removeItemFromCart(prod.id) : addItemToCart(prod.id);
            }}
          ></IconButton>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
