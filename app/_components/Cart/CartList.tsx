import { useCart } from "@/app/_context/CartContext";
import CartItem from "../UI/CartItem";

function CartList() {
  const { cart } = useCart();
  return (
    <div className="flex flex-col">
      {cart.map((item, i) => (
        <CartItem cartItem={item} key={i} />
      ))}
    </div>
  );
}

export default CartList;
