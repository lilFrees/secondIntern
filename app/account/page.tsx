import LogoutButton from "@/app/_components/UI/LogoutButton";
import UnauthorizedState from "../_components/UI/UnauthorizedState";
import { auth } from "@/app/_lib/auth";
import OrderList from "../_components/Orders/OrderList";

async function Page() {
  const session = await auth();

  if (!session) {
    return <UnauthorizedState />;
  }
  return (
    <div>
      <h1>Welcome, {session?.user?.email}</h1>
      <OrderList />
      <LogoutButton />
    </div>
  );
}

export default Page;
