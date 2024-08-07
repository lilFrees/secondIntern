import AuthForm from "../_components/UI/AuthForm";


const Page = ({ searchParams }) => {
  return (
    <AuthForm type="login" searchParams={searchParams} />
  );
};

export default Page;
