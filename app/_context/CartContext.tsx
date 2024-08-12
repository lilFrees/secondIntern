"use client";

import { createContext, useEffect, useState } from "react";
import { ICartItem } from "../_interfaces/ICartItem";
import { getCartItems } from "../_lib/cart-service";

interface ICartContext {
  cart: ICartItem[];
  loading: boolean;
  cartIdArray: number[];
}

export const CartContext = createContext<ICartContext | null>(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [idArray, setIdArray] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const cartChannel = new BroadcastChannel("cart");

    async function checkCart(displayLoader?: boolean) {
      setLoading(displayLoader !== undefined ? displayLoader : true);
      const data = await getCartItems();
      if (data === null) {
        setCart([]);
        setIdArray([]);
        setLoading(false);
        return;
      }
      setCart(data);
      setIdArray(data.map((item) => item.item.id));
      setLoading(false);
    }

    checkCart();

    cartChannel.onmessage = function (event) {
      if (event.data.type === "CLEAR") {
        setCart([]);
        setLoading(false);
      } else if (event.data.type === "UPDATING") {
        console.log("updating");
        checkCart(false);
      } else {
        setLoading(true);
        checkCart();
      }
    };

    return () => {
      cartChannel.close();
    };
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, cartIdArray: idArray }}>
      {children}
    </CartContext.Provider>
  );
}
