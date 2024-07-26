"use client";

import { openDB } from "idb";
import { IProduct } from "../_interfaces/IProduct";
import { ICartItem } from "../_interfaces/ICartItem";

const storeName = "shopping-cart";
const CartStore = "cart";
const FavoriteStore = "favorites";

export const cartChannel = "cart-channel";
export const favoriteChannel = "favorites-channel";

export const updateFavorites = "updateFavorites";
export const updateCart = "updateCart";

const broadcastFavoriteChannel = new BroadcastChannel(favoriteChannel);
const broadcastCartChannel = new BroadcastChannel(cartChannel);

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
        keyPath: "item.id",
      });
    }
  },
});

export async function getAllCartItems(): Promise<ICartItem[]> {
  const db = await dbPromise;
  return await db.getAll(CartStore);
}

export async function addItemToCart(item: IProduct, quantity: number = 1) {
  const db = await dbPromise;
  const tx = db.transaction(CartStore, "readwrite");
  const store = tx.objectStore(CartStore);

  const existingItem = await store.get(item.id);

  if (existingItem) {
    existingItem.quantity += quantity;
    store.put(existingItem);
  } else {
    await store.add({ item, quantity });
  }

  broadcastCartChannel.postMessage({ type: updateCart });
  await tx.done;
}

export async function removeItemFromCart(id: number) {
  const db = await dbPromise;
  const tx = db.transaction(CartStore, "readwrite");
  await tx.objectStore(CartStore).delete(id);
  broadcastCartChannel.postMessage({ type: updateCart });
  db.delete(CartStore, id);
  await tx.done;
}

export async function updateItemInCart(item: IProduct, newQuantity: number) {
  const db = await dbPromise;
  const tx = db.transaction(CartStore, "readwrite");
  const store = tx.objectStore(CartStore);

  const existingItem = await store.get(item.id);
  if (existingItem) {
    existingItem.quantity = newQuantity;
    store.put(existingItem);
  } else {
    await store.add({ item, quantity: newQuantity });
  }
  broadcastCartChannel.postMessage({ type: updateCart });
  await tx.done;
}

export async function clearCart() {
  const db = await dbPromise;
  broadcastCartChannel.postMessage({ type: updateCart });
  db.clear(CartStore);
}

export async function getAllFavoriteItems(): Promise<IProduct[]> {
  const db = await dbPromise;
  return await db.getAll(FavoriteStore);
}

export async function addItemToFavorite(item: IProduct) {
  const db = await dbPromise;
  db.add(FavoriteStore, item);
  broadcastFavoriteChannel.postMessage({ type: updateFavorites });
}

export async function removeItemFromFavorites(id: number) {
  const db = await dbPromise;
  db.delete(FavoriteStore, id);
  broadcastFavoriteChannel.postMessage({ type: updateFavorites });
}

export async function clearAllFavorites() {
  const db = await dbPromise;
  db.clear(FavoriteStore);
  broadcastFavoriteChannel.postMessage({ type: updateFavorites });
}
