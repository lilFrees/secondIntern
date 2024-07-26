"use client";

import { IProduct } from "@/app/_interfaces/IProduct";
import { IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import StarRating from "./StarRating";
import {
  addItemToFavorite,
  removeItemFromFavorites,
  addItemToCart,
  removeItemFromCart,
} from "@/app/_lib/shopping-cart";
import { useFavorite } from "@/app/_context/FavoriteContext";
import { useCart } from "@/app/_context/CartContext";

const ProductCard = memo(function ProductCard({ prod }: { prod: IProduct }) {
  const { favorites } = useFavorite();
  const { cart } = useCart();

  const isFavorite: boolean = favorites.find((value) => value.id === prod.id)
    ? true
    : false;

  const isInCart: boolean = cart.find((value) => value.item.id === prod.id)
    ? true
    : false;

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-slate-300 bg-white p-3">
      <div className="relative h-40 w-full">
        <Image
          className="object-contain"
          fill
          src={prod.thumbnail}
          alt="product thumbnail"
          sizes="600px"
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
            icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme="green"
            onClick={() => {
              isFavorite
                ? removeItemFromFavorites(prod.id)
                : addItemToFavorite(prod);
            }}
          ></IconButton>
          <IconButton
            icon={<TiShoppingCart />}
            aria-label="Add to Cart"
            variant="ghost"
            colorScheme={isInCart ? "red" : "green"}
            onClick={() => {
              isInCart ? removeItemFromCart(prod.id) : addItemToCart(prod);
            }}
          ></IconButton>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
