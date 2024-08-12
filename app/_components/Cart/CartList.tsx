import { ICartItem } from "@/app/_interfaces/ICartItem";
import CartItem from "../UI/CartItem";
import useCart from "@/app/_hooks/useCart";

function CartList({ cart }: { cart: ICartItem[] }) {
  if (cart.length === 0) {
    return;
  }

  console.log(cart);

  return (
    <div className="flex flex-col">
      {cart.map((item, i) => (
        <CartItem cartItem={item} key={i} />
      ))}
    </div>
  );
}

export default CartList;
