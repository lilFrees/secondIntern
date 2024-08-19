"use client";

import { OrderWithItems } from "@/app/_interfaces/IOrder";
import { getOrders } from "@/app/_lib/order-service";
import { Skeleton, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Stack gap={5} my={10}>
        <Skeleton height={250} />
        <Skeleton height={250} />
        <Skeleton height={250} />
      </Stack>
    );
  }

  if (!isLoading && orders.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <div className="mb-10 flex flex-col gap-5">
      <h2 className="mb-5 text-2xl font-semibold">Your orders</h2>
      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <div
            key={order.id}
            className="overflow-hidden rounded-lg bg-white p-6 shadow-lg"
          >
            <div className="mb-4">
              <p>Order ID: {order.id}</p>
              <p className="text-gray-600">Status: {order.order_status}</p>
              <p className="text-gray-600">
                Total Amount: ${order.total_amount.toFixed(2)}
              </p>
              <p className="text-gray-600">
                Created At: {new Date(order.created_at).toLocaleString()}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Products</h3>
              <ul className="list-inside list-disc">
                {order.items.map((item, i) => (
                  <li key={i} className="text-gray-600">
                    {item.product.title} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
