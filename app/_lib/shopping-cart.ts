"use client";

import { openDB } from "idb";
import { IProduct } from "../_interfaces/IProduct";

const storeName = "shopping-cart";
const CartStore = "cart";
const FavoriteStore = "favorites";

const broadcastChanel = new BroadcastChannel("favorites-channel");

const dbPromise = openDB(storeName, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(FavoriteStore)) {
      db.createObjectStore(FavoriteStore, {
        keyPath: "id",
        autoIncrement: true,
      });
    }
    if (!db.objectStoreNames.contains(CartStore)) {
      const store = db.createObjectStore(CartStore, {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("itemId", "item.id", { unique: true });
    }
  },
});

export async function getAllCartItems() {
  const db = await dbPromise;
  return await db.getAll(CartStore);
}

export async function addItemToCart(item: IProduct) {
  const db = await dbPromise;
  db.add(CartStore, item);
}

export async function removeItemFromCart(id: number) {
  const db = await dbPromise;
  db.delete(CartStore, id);
}

export async function updateItemInCart(item: IProduct) {
  const db = await dbPromise;
  db.put(CartStore, item);
}

export async function getAllFavoriteItems(): Promise<IProduct[]> {
  const db = await dbPromise;
  return await db.getAll(FavoriteStore);
}

export async function addItemToFavorite(item: IProduct) {
  const db = await dbPromise;
  db.add(FavoriteStore, item);
  broadcastChanel.postMessage({ type: "updateFavorites" });
}

export async function removeItemFromFavorites(id: number) {
  const db = await dbPromise;
  db.delete(FavoriteStore, id);
  broadcastChanel.postMessage({ type: "updateFavorites" });
}

export async function clearAllFavorites() {
  const db = await dbPromise;
  db.clear(FavoriteStore);
  broadcastChanel.postMessage({ type: "updateFavorites" });
}
