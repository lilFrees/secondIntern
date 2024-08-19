import AuthForm from "../_components/UI/AuthForm";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/account");
  }

  return <AuthForm type="register" />;
};

export default Page;
