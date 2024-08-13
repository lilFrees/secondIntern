"use client";

import { getOrders } from "@/app/_lib/order-service";
import { useEffect } from "react";

function OrderList() {
  const fetchOrders = async () => {
    const orders = await getOrders();
    console.log(orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Your orders</h2>
    </div>
  );
}

export default OrderList;
