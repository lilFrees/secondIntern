import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./_context/CartContext";
import { FavoritesProvider } from "./_context/FavoriteContext";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <CartProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CartProvider>
      </FavoritesProvider>
    </SessionProvider>
  );
}
