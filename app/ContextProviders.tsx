"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { CartProvider } from "./_context/CartContext";
import { WishlistProvider } from "./_context/WishlistContext";
import { UserProvider, useUserStore } from "./_hooks/userStore";
import { getSupabaseClient } from "./_lib/supabase/client";
import { useEffect } from "react";

export function ContextProviders({ children }: { children: React.ReactNode }) {
  // const { setUser } = useUserStore();

  // const supabase = getSupabaseClient();

  // useEffect(() => {
  //   async function fetchUser() {
  //     const { data } = await supabase.auth.getUser();
  //     setUser(data.user);
  //   }
  //   fetchUser();
  // }, []);

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
