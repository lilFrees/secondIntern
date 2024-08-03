"use client";

import { ICartItem } from "@/app/_interfaces/ICartItem";
import { Button, Checkbox } from "@chakra-ui/react";
import Image from "next/image";
import NumberInput from "./NumberInput";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeItemFromCart } from "@/app/_lib/shopping-cart";
import Link from "next/link";
import { useState } from "react";

function CartItem({ cartItem: { item } }: { cartItem: ICartItem }) {
  const [quantity, setQuantity] = useState<number>(1);

  function updateQuantity(value: number) {
    setQuantity(value);
  }

  return (
    <div className="flex gap-5 border-b border-slate-300 py-5">
      <div className="relative flex-shrink-0 basis-[72px]">
        <Image
          src={item.thumbnail}
          alt="Cart product image"
          fill
          className="block h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-grow flex-col gap-5">
        <Link href={`products/${item.id}`} className="text-xl font-semibold">
          {item.title}
        </Link>
        <div className="flex items-center gap-5">
          <div className="text-lg text-slate-500">Price:</div>
          <div className="text-lg">${item.price}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-lg text-slate-500">Brand:</div>
          <div className="text-lg">{item.brand || "Green Haven"}</div>
        </div>
        <div className="flex justify-between">
          <NumberInput
            quantity={quantity}
            onChange={updateQuantity}
            max={item.stock}
          />
          <Button
            colorScheme="green"
            variant="ghost"
            leftIcon={<FaRegTrashAlt />}
            onClick={() => removeItemFromCart(item.id)}
            size="sm"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
