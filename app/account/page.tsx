import LogoutButton from "@/app/_components/UI/LogoutButton";
import UnauthorizedState from "../_components/UI/UnauthorizedState";
import { auth } from "@/app/_lib/auth";
import OrderList from "../_components/Orders/OrderList";
import { Suspense } from "react";

async function Page() {
  const session = await auth();
  console.log(session);

  if (!session) {
    return <UnauthorizedState text="Please login to see your account" />;
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
