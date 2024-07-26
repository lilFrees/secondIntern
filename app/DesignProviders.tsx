"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllFavoriteItems } from "./_lib/shopping-cart";
import { IProduct } from "./_interfaces/IProduct";

export function DesignProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </FavoritesProvider>
  );
}

const FavoritesContext = createContext<{
  favorites: IProduct[];
  fetchFavorites: () => Promise<void>;
}>({
  favorites: [],
  fetchFavorites: async () => {},
});

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  const fetchFavorites = async () => {
    const favs = await getAllFavoriteItems();

    setFavorites(favs);
  };

  useEffect(() => {
    fetchFavorites();
    const broadcastChannel = new BroadcastChannel("favorites-channel");

    broadcastChannel.onmessage = (event) => {
      if (event.data.type === "updateFavorites") {
        fetchFavorites();
      }
    };

    return () => {
      broadcastChannel.close();
    };
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorite() {
  return useContext(FavoritesContext);
}
