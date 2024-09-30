import { ICartItem } from "../interfaces/ICartItem";
import CartItem from "./CartItem";

function CartList({ cart }: { cart: ICartItem[] }) {
  if (cart.length === 0) {
    return;
  }

  return (
    <div className="flex w-full basis-full flex-col md:basis-2/3">
      {cart.map((item, i) => (
        <CartItem cartItem={item} key={i} />
      ))}
    </div>
  );
}

export default CartList;
