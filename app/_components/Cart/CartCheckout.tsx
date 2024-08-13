import useCart from "@/app/_hooks/useCart";
import { Button } from "@chakra-ui/react";
import { addOrder } from "@/app/_lib/order-service";

function CartCheckout() {
  const { cart, cartIdArray } = useCart();

  if (cart.length === 0) {
    return null;
  }

  const total = cart.reduce((acc, item) => {
    return acc + item.item.price * item.quantity;
  }, 0);

  return (
    <div className="sticky top-10 mt-10 flex basis-1/3 flex-col gap-2 rounded-lg bg-slate-200 p-5">
      <div className="mb-5 flex items-end gap-5">
        <div className="grow basis-1/2 text-2xl font-bold">Total</div>
        <div className="grow basis-1/2 text-lg font-bold">
          $ {total.toFixed(2)}
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="grow basis-1/2 text-slate-500">Product count</div>
        <div className="grow basis-1/2">{cartIdArray.length} pcs.</div>
      </div>
      <div className="mb-5 flex items-end gap-5">
        <div className="grow basis-1/2 text-slate-500">Shipping</div>
        <div className="grow basis-1/2 font-semibold text-green-700">Free</div>
      </div>
      <Button
        colorScheme="green"
        size="lg"
        flexGrow={1}
        onClick={() => addOrder({ items: cart, total })}
      >
        Checkout
      </Button>
    </div>
  );
}

export default CartCheckout;
