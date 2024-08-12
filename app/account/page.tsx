import LogoutButton from "@/app/_components/UI/LogoutButton";
import UnauthorizedState from "../_components/UI/UnauthorizedState";
import { auth } from "@/app/_lib/auth";

async function Page() {
  const session = await auth();

  if (!session) {
    return <UnauthorizedState />;
  }
  return (
    <div>
      <h1>Welcome, {session?.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}

export default Page;
