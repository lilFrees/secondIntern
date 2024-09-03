import { redirect } from "next/navigation";
import { readUserSession } from "../_auth/readUserSession";
import AuthForm from "../_components/UI/AuthForm";

const Page = async () => {
  const {
    data: { session },
  } = await readUserSession();

  if (session) redirect("/account");
  return <AuthForm type="register" />;
};

export default Page;
