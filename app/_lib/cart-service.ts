import { ICartItem } from "../_interfaces/ICartItem";
import { supabase } from "./supabase";

const cartChanel = new BroadcastChannel("cart");

export async function getCartItems(): Promise<ICartItem[]> {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      return [];
    }
    const { data, error } = await supabase
      .from("cart_items")
      .select("product_id,quantity")
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    if (data?.length === 0) {
      return [];
    }

    const items = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .in(
        "id",
        data!.map((item) => item.product_id),
      );

    const cartItems = items.data!.map((item) => {
      const cartItem = data!.find(
        (cartItem) => cartItem.product_id === item.id,
      );
      return {
        item,
        quantity: cartItem?.quantity || 0,
      };
    });

    return cartItems as ICartItem[];
  } catch (error) {
    console.error("Failed fetching cart items:", error);
    return [];
  }
}

export async function addItemToCart(id: number, quantity: number = 1) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      console.log("No user");
      return null;
    }

    console.log("there is a user");
    const { data, error } = await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: id,
      quantity,
    });

    if (!error) {
      cartChanel.postMessage({ type: "ADD_ITEM" });
    }
  } catch (error) {
    console.error("Failed adding item to cart:", error);
  }
}

export async function updateCartItem(id: number, quantity: number) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      return null;
    }
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: quantity })
      .eq("user_id", userId)
      .eq("product_id", id);

    if (!error) {
      cartChanel.postMessage({ type: "UPDATE_ITEM" });
    }
  } catch (error) {
    console.error("Failed updating item in cart:", error);
  }
}

export async function removeItemFromCart(id: number) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      return null;
    }
    const { data, error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", id);

    if (!error) {
      cartChanel.postMessage({ type: "REMOVE_ITEM" });
    }
  } catch (error) {
    console.error("Failed removing item from cart:", error);
  }
}

export async function clearCart() {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) {
      return null;
    }
    const { data, error } = await supabase
      .from("cart_items")
      .delete({
        count: "estimated",
      })
      .eq("user_id", userId);

    if (!error) {
      cartChanel.postMessage({ type: "CLEAR" });
    }
  } catch (error) {
    console.error("Failed clearing cart:", error);
  }
}
