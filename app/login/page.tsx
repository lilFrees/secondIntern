import AuthForm from "../_components/UI/AuthForm";
import { getSession } from "next-auth/react";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/account");
  }
  return <AuthForm type="login" />;
};

export default Page;
