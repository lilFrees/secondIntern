import { useContext } from "react";
import { WishlistContext } from "../_context/WishlistContext";

export default function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
