"use client";

import { createContext, useEffect, useState } from "react";
import { ICartItem } from "../_interfaces/ICartItem";
import { getCartItems } from "../_lib/cart-service";
import { useToast } from "@chakra-ui/react";

interface ICartContext {
  cart: ICartItem[];
  loading: boolean;
  mounted: boolean;
  cartIdArray: number[];
}

export const CartContext = createContext<ICartContext | null>(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [idArray, setIdArray] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    const cartChannel = new BroadcastChannel("cart");

    async function checkCart() {
      const data = await getCartItems();
      setMounted(true);
      setIdArray(data.map((item) => item.item.id));
      setCart(data);
      setLoading(false);
    }

    checkCart();

    cartChannel.onmessage = function (event) {
      if (event.data.type === "CLEAR") {
        setCart([]);
        setIdArray([]);
        setLoading(false);
        toast({
          title: "Cart Cleared",
          description: "Your cart has been cleared",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "subtle",
        });
      } else if (event.data.type === "UPDATE_ITEM") {
        setLoading(true);
        checkCart();
      } else {
        switch (event.data.type) {
          case "ADD_ITEM":
            toast({
              title: "Item Added",
              description: "Item has been added to cart",
              status: "success",
              duration: 3000,
              isClosable: true,
              variant: "subtle",
            });
            break;
          case "REMOVE_ITEM":
            toast({
              title: "Item Removed",
              description: "Item has been removed from cart",
              status: "success",
              duration: 3000,
              isClosable: true,
              variant: "subtle",
            });
            break;
          default:
            break;
        }

        setLoading(true);
        checkCart();
      }
    };

    return () => {
      cartChannel.close();
    };
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, loading, cartIdArray: idArray, mounted }}
    >
      {children}
    </CartContext.Provider>
  );
}
