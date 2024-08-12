"use client";

import { createContext, useEffect, useState } from "react";
import { IProduct } from "../_interfaces/IProduct";
import { getWishlist } from "../_lib/wishlist-service";

interface IWishlistContext {
  wishlist: IProduct[];
  loading: boolean;
  wishlistIdArray: number[];
}

export const WishlistContext = createContext<IWishlistContext | null>(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idArray, setIdArray] = useState<number[]>([]);

  useEffect(() => {
    const wishListChannel = new BroadcastChannel("wishlist");

    async function checkCart() {
      const data = await getWishlist();
      setIdArray(data.map((item) => item.id));
      setWishlist(data);
      setLoading(false);
    }

    checkCart();

    wishListChannel.onmessage = function (event) {
      if (event.data.type === "CLEAR") {
        setWishlist([]);
        setLoading(false);
        setIdArray([]);
      } else {
        setLoading(true);
        checkCart();
      }
    };

    return () => {
      wishListChannel.close();
    };
  }, []);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, wishlistIdArray: idArray }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
