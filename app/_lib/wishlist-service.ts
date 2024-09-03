import { IProduct } from "../_interfaces/IProduct";
import { getSupabaseClient } from "./supabase/client";

const wishlistChannel = new BroadcastChannel("wishlist");

const supabase = getSupabaseClient();

export async function getWishlist(): Promise<IProduct[]> {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!user) {
      return [];
    }

    if (userError) throw userError;

    const { data, error } = await supabase
      .from("favorite_items")
      .select("product_id")
      .eq("user_id", user.id);

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

    return items.data as IProduct[];
  } catch (error) {
    console.error("Failed fetching cart items:", error);
    return [];
  }
}

export async function addItemToWishlist(id: number) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No user");
    }

    if (userError) throw userError.message;

    const { data, error } = await supabase.from("favorite_items").insert({
      user_id: user.id,
      product_id: id,
    });

    if (!error) {
      wishlistChannel.postMessage({ type: "ADD_ITEM" });
    }
  } catch (error) {
    console.error("Failed adding item to cart:", error);
  }
}

export async function removeItemFromWishlist(id: number) {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No user");
    }

    if (userError) throw userError.message;

    const { data, error } = await supabase
      .from("favorite_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", id);

    if (!error) {
      wishlistChannel.postMessage({ type: "REMOVE_ITEM" });
    }
  } catch (error) {
    console.error("Failed removing item from cart:", error);
  }
}

export async function clearWishlist() {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    const { data, error } = await supabase
      .from("favorite_items")
      .delete({
        count: "estimated",
      })
      .eq("user_id", userId);

    if (!error) {
      wishlistChannel.postMessage({ type: "CLEAR" });
    }
  } catch (error) {
    console.error("Failed clearing cart:", error);
  }
}
