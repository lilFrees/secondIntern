"use client";

import { Button } from "@chakra-ui/react";
import { useCart } from "../_context/CartContext";
import { FaRegCircleXmark } from "react-icons/fa6";
import { clearCart } from "../_lib/shopping-cart";
import CartList from "../_components/Cart/CartList";
import Link from "next/link";
import EmptyState from "../_components/UI/EmptyState";

function Page() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <EmptyState text="Your cart is empty" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-between border-b border-b-slate-300 pb-5">
        <div className="flex items-end gap-5">
          <h2 className="text-2xl font-semibold">Cart</h2>
          <p>{cart.length} item(s)</p>
        </div>
        <Button
          variant="ghost"
          leftIcon={<FaRegCircleXmark />}
          onClick={clearCart}
        >
          Clear
        </Button>
      </div>
      <CartList />
    </div>
  );
}

export default Page;
