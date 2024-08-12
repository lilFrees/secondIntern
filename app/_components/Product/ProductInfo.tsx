"use client";

import { IProduct } from "@/app/_interfaces/IProduct";
import { addItemToCart, updateCartItem } from "@/app/_lib/cart-service";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/app/_lib/wishlist-service";
import { Button, IconButton } from "@chakra-ui/react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import NumberInput from "../UI/NumberInput";
import StarRating from "../UI/StarRating";
import { useState } from "react";
import useWishlist from "@/app/_hooks/useWishlist";
import useCart from "@/app/_hooks/useCart";

function ProductInfo({ product }: { product: IProduct }) {
  const [quantity, setQuantity] = useState<number>(1);
  const { cart, cartIdArray } = useCart();

  function handleQuantityChange(value: number) {
    setQuantity(value);
  }

  const { wishlistIdArray } = useWishlist();

  const isFavorite = wishlistIdArray.includes(product.id);
  const isInCart = cartIdArray.includes(product.id);

  const currentQuantity = cart.find(
    (item) => item.item.id === product.id,
  )?.quantity;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <StarRating rating={product.rating} />
        <div>{product.reviews.length} review(s)</div>
      </div>
      <h1 className="font text-3xl font-semibold">{product.title}</h1>
      <div className="text-lg">$ {product.price}</div>
      <NumberInput
        quantity={quantity}
        max={product.stock}
        onChange={handleQuantityChange}
      />
      <div className="flex items-center gap-5">
        <Button
          className="font-semibold text-white"
          colorScheme="green"
          flexGrow={1}
          leftIcon={<TiShoppingCart />}
          onClick={() => {
            isInCart
              ? updateCartItem(product.id, quantity + currentQuantity!)
              : addItemToCart(product.id, quantity);
          }}
        >
          Add to cart
        </Button>
        <IconButton
          aria-label="Add to favorites"
          variant="ghost"
          icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
          colorScheme="green"
          onClick={() => {
            isFavorite
              ? removeItemFromWishlist(product.id)
              : addItemToWishlist(product.id);
          }}
        />
      </div>
      {product.brand && (
        <div className="flex flex-col gap-2 self-start rounded-xl bg-slate-200/75 p-2">
          <div className="text-xs text-slate-500">Seller</div>
          <div>{product.brand}</div>
        </div>
      )}
      <div className="flex flex-col gap-5 rounded-md bg-slate-200/75 px-4 py-7">
        <div className="flex gap-5">
          <div className="flex gap-5">
            <FaTruck />
          </div>
          <div className="flex flex-col gap-2">
            <div>Delivery</div>
            <div className="text-sm text-green-500">Free delivery</div>
            <p className="text-sm">{product.shippingInformation}</p>
          </div>
        </div>
        <div className="h-px w-full bg-slate-300"></div>
        <div className="flex gap-5">
          <HiOutlineSwitchHorizontal />
          <div className="flex flex-col gap-2">
            <div>Return Policy</div>
            <p className="text-sm">{product.returnPolicy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
