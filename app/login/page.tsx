import { redirect } from "next/navigation";
import AuthForm from "../_components/UI/AuthForm";
import { auth } from "../_lib/auth";

const Page = async () => {
  const session = await auth();
  if (session) {
    redirect("/account");
  }
  return <AuthForm type="login" />;
};

export default Page;
