"use client";
import { lazy } from "react";
import { ChakraProvider } from "@chakra-ui/react";
const CartProvider = lazy(() => import("./_features/cart/context/CartContext"));
const WishlistProvider = lazy(
  () => import("./_features/favorites/context/WishlistContext"),
);
const UserProvider = lazy(() => import("./_features/auth/hooks/userStore"));
import { QueryClientProvider, QueryClient } from "react-query";
const queryClient = new QueryClient();

export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
