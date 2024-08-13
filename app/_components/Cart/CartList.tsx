import { ICartItem } from "@/app/_interfaces/ICartItem";
import CartItem from "../UI/CartItem";

function CartList({ cart }: { cart: ICartItem[] }) {
  if (cart.length === 0) {
    return;
  }

  return (
    <div className="flex basis-2/3 flex-col">
      {cart.map((item, i) => (
        <CartItem cartItem={item} key={i} />
      ))}
    </div>
  );
}

export default CartList;
