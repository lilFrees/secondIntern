import { ICartItem } from "../_interfaces/ICartItem";
import { OrderWithItems } from "../_interfaces/IOrder";
import { IProduct } from "../_interfaces/IProduct";
import { clearCart } from "./cart-service";
import { supabase } from "./supabase";

export async function addOrder({
  items,
  total,
}: {
  items: ICartItem[];
  total: number;
}) {
  // First add the order to the orders table
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id: userId,
      order_status: "pending",
      total_amount: total,
    })
    .select("id");

  if (error) throw error;

  // Then add the items to the order_items table
  const orderId = data[0].id;

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_id: item.item.id,
    quantity: item.quantity,
    price: item.item.price,
  }));

  const { error: error2 } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (error2) throw error2;

  // // Finally, clear the cart
  clearCart();
}

export async function getOrders(): Promise<OrderWithItems[]> {
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId);

  if (ordersError) throw ordersError;

  const orderIds = orders.map((order) => order.id);

  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("order_id", orderIds);

  if (orderItemsError) throw orderItemsError;

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in(
      "id",
      orderItems.map((item) => item.product_id),
    );

  if (productsError) throw productsError;

  const productsMap = new Map<string, IProduct>(
    products.map((product) => [product.id, product]),
  );

  const ordersWithItems: OrderWithItems[] = orders.map((order) => {
    const items = orderItems
      .filter((item) => item.order_id === order.id)
      .map((item) => ({
        ...item,
        product: productsMap.get(item.product_id)!,
      }));

    return { ...order, items };
  });

  return ordersWithItems;
}
