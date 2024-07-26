import { ICartItem } from "@/app/_interfaces/ICartItem";
import { Button, Checkbox } from "@chakra-ui/react";
import Image from "next/image";
import NumberInput from "./NumberInput";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeItemFromCart } from "@/app/_lib/shopping-cart";

function CartItem({ cartItem: { item } }: { cartItem: ICartItem }) {
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
        <h3 className="text-xl font-semibold">{item.title}</h3>
        <div className="flex items-center gap-5">
          <div className="text-lg text-slate-500">Price:</div>
          <div className="text-lg">${item.price}</div>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-lg text-slate-500">Brand:</div>
          <div className="text-lg">${item.brand}</div>
        </div>
        <div className="flex justify-between">
          <NumberInput max={item.stock} />
          <Button
            colorScheme="red"
            variant="ghost"
            leftIcon={<FaRegTrashAlt />}
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
