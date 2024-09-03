"use client";
import { clearCart } from "@/app/_lib/cart-service";
import { Button, Spinner } from "@chakra-ui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import CartCheckout from "../_components/Cart/CartCheckout";
import CartList from "../_components/Cart/CartList";
import EmptyState from "../_components/UI/EmptyState";
import UnauthorizedState from "../_components/UI/UnauthorizedState";
import useCart from "../_hooks/useCart";
import useScreenSize from "../_hooks/useScreenSize";
import { useUser } from "../_hooks/userStore";

function Page() {
  const { user } = useUser();
  const { cart, cartIdArray, mounted } = useCart();
  const { width } = useScreenSize();

  if (!user) {
    return <UnauthorizedState text="Please login to view your cart" />;
  }

  if (!mounted) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner colorScheme="green" size="lg" />
      </div>
    );
  }

  if (cartIdArray.length === 0) {
    return <EmptyState text="Your cart seems to be empty 😔" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-between border-b border-b-slate-300 pb-5">
        <div className="flex items-end gap-5">
          <h2 className="text-xl font-semibold md:text-2xl">Cart</h2>
          <p className="text-sm md:text-base">{cartIdArray.length} item(s)</p>
        </div>
        <Button
          variant="ghost"
          leftIcon={<FaRegCircleXmark />}
          onClick={() => clearCart()}
          size={width <= 768 ? "sm" : "md"}
        >
          Clear
        </Button>
      </div>
      <div className="relative flex flex-col items-start gap-10 md:flex-row">
        <CartList cart={cart} />
        <CartCheckout />
      </div>
    </div>
  );
}

export default Page;
