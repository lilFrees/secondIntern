"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../_interfaces/IProduct";
import {
  favoriteChannel,
  getAllFavoriteItems,
  updateFavorites,
} from "../_lib/shopping-cart";
import { useAuthSync } from "../_hooks/useAuthSync";

const FavoritesContext = createContext<{
  favorites: IProduct[];
  fetchFavorites: () => Promise<void>;
}>({
  favorites: [],
  fetchFavorites: async () => {},
});

export const FavoritesProvider = ({ children }) => {
  useAuthSync();

  const [favorites, setFavorites] = useState<IProduct[]>([]);

  const fetchFavorites = async () => {
    const favs = await getAllFavoriteItems();

    setFavorites(favs);
  };

  useEffect(() => {
    fetchFavorites();
    const broadcastChannel = new BroadcastChannel(favoriteChannel);

    broadcastChannel.onmessage = (event) => {
      if (event.data.type === updateFavorites) {
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
