"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./_features/cart/context/CartContext";
import { WishlistProvider } from "./_features/favorites/context/WishlistContext";
import { UserProvider } from "./_features/auth/hooks/userStore";

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
