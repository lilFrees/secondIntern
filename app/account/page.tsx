import LogoutButton from "@/app/_shared/components/LogoutButton";
import { Suspense } from "react";
import { readUserSession } from "../_features/auth/services/readUserSession";
import OrderList from "../_features/orders/components/OrderList";

async function Page() {
  const {
    data: { user },
  } = await readUserSession();

  return (
    <div className="py-5">
      <h1>Welcome, {user?.user_metadata.name || user?.email}</h1>
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrderList />
      </Suspense>
      <LogoutButton />
    </div>
  );
}

export default Page;
