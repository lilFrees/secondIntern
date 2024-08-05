import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import { auth } from "../api/auth/[...nextauth]/route";
import LogoutButton from "@/app/_components/UI/LogoutButton";

async function Page() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1>Welcome, {session?.user?.email}</h1>
      <LogoutButton />
    </div>
  );
}

export default Page;
