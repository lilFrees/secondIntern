"use client";
import { Button, Spinner } from "@chakra-ui/react";
import { FaRegCircleXmark } from "react-icons/fa6";
import CartList from "../_components/Cart/CartList";
import EmptyState from "../_components/UI/EmptyState";
import { clearCart } from "@/app/_lib/cart-service";
import useCart from "../_hooks/useCart";
import { useSession } from "next-auth/react";
import UnauthorizedState from "../_components/UI/UnauthorizedState";
import CartCheckout from "../_components/Cart/CartCheckout";

function Page() {
  const session = useSession();
  const { cart, loading, cartIdArray } = useCart();

  if (session.status === "unauthenticated") {
    return <UnauthorizedState />;
  }

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner colorScheme="green" size="lg" />
      </div>
    );
  }

  if (cartIdArray.length === 0 && session.status === "authenticated") {
    return <EmptyState text="Your cart seems to be empty 😔" />;
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-between border-b border-b-slate-300 pb-5">
        <div className="flex items-end gap-5">
          <h2 className="text-2xl font-semibold">Cart</h2>
          <p>{cartIdArray.length} item(s)</p>
        </div>
        <Button
          variant="ghost"
          leftIcon={<FaRegCircleXmark />}
          onClick={() => clearCart()}
        >
          Clear
        </Button>
      </div>
      <div className="relative flex items-start gap-10">
        <CartList cart={cart} />
        <CartCheckout />
      </div>
    </div>
  );
}

export default Page;
