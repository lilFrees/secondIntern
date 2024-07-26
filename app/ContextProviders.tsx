"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { FavoritesProvider } from "./_context/FavoriteContext";
import { CartProvider } from "./_context/CartContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}
