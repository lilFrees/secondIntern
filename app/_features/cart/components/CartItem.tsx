"use client";

import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import useCart from "../hooks/useCart";
import { ICartItem } from "../interfaces/ICartItem";
import NumberInput from "@/app/_shared/components/NumberInput";
import { removeItemFromCart, updateCartItem } from "../services/cart-service";

function CartItem({ cartItem: { item, quantity } }: { cartItem: ICartItem }) {
  function updateQuantity(value: number) {
    updateCartItem(item.id, value);
  }

  const { loading } = useCart();

  return (
    <div className="flex gap-5 border-b border-slate-300 py-5">
      <div className="relative flex-shrink-0 basis-[70px] md:basis-[150px]">
        <Image
          src={item.thumbnail}
          alt="Cart product image"
          fill
          className="block h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-grow flex-col gap-5">
        <Link
          href={`products/${item.id}`}
          className="text-sm font-semibold md:text-lg"
        >
          {item.title}
        </Link>
        <div className="flex items-center gap-5">
          <div className="text-sm text-slate-500 md:text-lg">Price:</div>
          <div className="text-sm md:text-lg">${item.price}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-sm text-slate-500 md:text-lg">Brand:</div>
          <div className="text-sm md:text-lg">
            {item.brand || "Green Haven"}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 sm:justify-between">
          <NumberInput
            quantity={quantity}
            onChange={updateQuantity}
            max={item.stock}
            loading={loading}
          />
          <Button
            colorScheme="green"
            variant="ghost"
            leftIcon={<FaRegTrashAlt />}
            size="sm"
            onClick={() => removeItemFromCart(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
