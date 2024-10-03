"use client";

import { createContext, useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { IProduct } from "../../product/interfaces/IProduct";
import { getWishlist } from "../services/wishlist-service";

interface IWishlistContext {
  wishlist: IProduct[];
  loading: boolean;
  wishlistIdArray: number[];
}

export const WishlistContext = createContext<IWishlistContext | null>(null);

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [idArray, setIdArray] = useState<number[]>([]);

  const toast = useToast();

  useEffect(() => {
    const wishListChannel = new BroadcastChannel("wishlist");

    async function checkWishlist() {
      const data = await getWishlist();
      setIdArray(data.map((item) => item.id));
      setWishlist(data);
      setLoading(false);
    }

    checkWishlist();

    wishListChannel.onmessage = function (event) {
      if (event.data.type === "CLEAR") {
        setWishlist([]);
        setLoading(false);
        setIdArray([]);
        toast({
          title: "Wishlist Cleared",
          description: "Your wishlist has been cleared",
          status: "success",
          duration: 3000,
          isClosable: true,
          variant: "subtle",
        });
      } else {
        switch (event.data.type) {
          case "ADD_ITEM":
            toast({
              title: "Item Added",
              description: "Item has been added to wishlist",
              status: "success",
              duration: 3000,
              isClosable: true,
              variant: "subtle",
            });
            break;
          case "REMOVE_ITEM":
            toast({
              title: "Item Removed",
              description: "Item has been removed from wishlist",
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
        checkWishlist();
      }
    };

    return () => {
      wishListChannel.close();
    };
  }, [toast]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, loading, wishlistIdArray: idArray }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
