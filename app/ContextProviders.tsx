import { ChakraProvider } from "@chakra-ui/react";
import { FavoritesProvider } from "./_context/FavoriteContext";
import { CartProvider } from "./_context/CartContext";
import { SessionProvider } from "next-auth/react";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <CartProvider>
        <SessionProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </SessionProvider>
      </CartProvider>
    </FavoritesProvider>
  );
}
