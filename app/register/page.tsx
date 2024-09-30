import { redirect } from "next/navigation";
import { readUserSession } from "../_features/auth/services/readUserSession";
import AuthForm from "../_features/auth/components/AuthForm";

const Page = async () => {
  const {
    data: { user },
  } = await readUserSession();

  if (user) redirect("/account");
  return <AuthForm type="register" />;
};

export default Page;
