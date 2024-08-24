import AuthForm from "../_components/UI/AuthForm";
import { auth } from "../_lib/auth";

const Page = async () => {
  const session = await auth();
  if (session?.user) {
    console.log("session", session);
  }
  return <AuthForm type="login" />;
};

export default Page;
