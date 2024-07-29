"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ICartItem } from "../_interfaces/ICartItem";
import {
  cartChannel,
  getAllCartItems,
  updateCart,
} from "@/app/_lib/shopping-cart";

const CartContext = createContext<{
  cart: ICartItem[];
  fetchCart: () => Promise<void>;
}>({
  cart: [],
  fetchCart: async () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState<ICartItem[]>([]);

  const fetchCart = async () => {
    const cartItems = await getAllCartItems();

    setCart(cartItems);
  };

  useEffect(() => {
    fetchCart();
    const broadcastChannel = new BroadcastChannel(cartChannel);

    broadcastChannel.onmessage = (event) => {
      if (event.data.type === updateCart) {
        fetchCart();
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
