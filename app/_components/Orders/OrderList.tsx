"use client";

import { OrderWithItems } from "@/app/_interfaces/IOrder";
import { getOrders } from "@/app/_lib/order-service";
import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  useEffect(() => {
    getOrders().then(setOrders);
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold">Your orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-5 bg-slate-500">
          <h3>Order id: {order.id}</h3>
          <p>Total: ${order.total_amount}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product.title} - {item.quantity} x ${item.product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
