"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./_context/CartContext";
import { WishlistProvider } from "./_context/WishlistContext";
import { UserProvider } from "./_hooks/userStore";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}
