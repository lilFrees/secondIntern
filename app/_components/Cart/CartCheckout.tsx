import useCart from "@/app/_hooks/useCart";
import { Button, useToast } from "@chakra-ui/react";
import { addOrder } from "@/app/_lib/order-service";
import useScreenSize from "@/app/_hooks/useScreenSize";

function CartCheckout() {
  const { cart, cartIdArray } = useCart();
  const toast = useToast();
  const { width } = useScreenSize();

  if (cart.length === 0) {
    return null;
  }

  const total = cart.reduce((acc, item) => {
    return acc + item.item.price * item.quantity;
  }, 0);

  async function handleOrder() {
    const error = await addOrder({ items: cart, total });
    if (!error) {
      toast({
        title: "Order placed successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error placing order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <div className="sticky top-10 mt-10 flex w-full basis-full flex-col gap-2 rounded-lg bg-slate-200 p-5 md:basis-1/3">
      <div className="mb-5 flex items-end gap-5">
        <div className="grow basis-1/2 text-lg font-bold md:text-2xl">
          Total
        </div>
        <div className="grow basis-1/2 text-base font-bold md:text-lg">
          $ {total.toFixed(2)}
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="grow basis-1/2 text-sm text-slate-500 md:text-base">
          Product count
        </div>
        <div className="grow basis-1/2 text-sm md:text-base">
          {cartIdArray.length} pcs.
        </div>
      </div>
      <div className="mb-5 flex items-end gap-5">
        <div className="grow basis-1/2 text-sm text-slate-500 md:text-base">
          Shipping
        </div>
        <div className="grow basis-1/2 text-sm font-semibold text-green-700 md:text-base">
          Free
        </div>
      </div>
      <Button
        colorScheme="green"
        size={width <= 768 ? "sm" : "md"}
        flexGrow={1}
        onClick={handleOrder}
      >
        Order Now
      </Button>
    </div>
  );
}

export default CartCheckout;
