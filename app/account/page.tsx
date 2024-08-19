import LogoutButton from "@/app/_components/UI/LogoutButton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OrderList from "../_components/Orders/OrderList";
import { auth } from "../_lib/auth";

async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="py-5">
      <h1>Welcome, {session?.user?.email}</h1>
      <Suspense fallback={<div>Loading orders...</div>}>
        <OrderList />
      </Suspense>
      <LogoutButton />
    </div>
  );
}

export default Page;
