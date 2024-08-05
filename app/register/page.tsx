"use client";

import { Button, Input, Spinner } from "@chakra-ui/react";
import { useState } from "react";

import googleIcon from "@/public/google-icon.webp";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  async function submitCredHandler(e) {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Invalid credentials.");
      } else {
        setError("Something went wrong.");
      }
      console.error(result.error);
    } else {
      router.push("/");
    }
  }

  async function submitGoogleHandler(e) {
    e.preventDefault();
    setError("");
    const result = await signIn("google", {
      redirect: false,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Invalid credentials.");
      } else {
        setError("Something went wrong.");
      }
      console.error(result.error);
    } else {
      router.push("/");
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center">
      <form
        className="mb-5 w-full rounded bg-white px-8 pb-8 pt-12 shadow-xl"
        onSubmit={submitCredHandler}
      >
        <h2 className="mb-4 text-center text-2xl font-bold">
          Create an Account
        </h2>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email:
          </label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password:
          </label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <Button colorScheme="green" type="submit" className="w-full">
          Sign Up Now
        </Button>

        <div className="flex w-full items-center gap-2">
          <div className="my-7 h-px flex-grow bg-slate-300" />
          <p className="w-max text-xs text-slate-500">Or Sign Up With</p>
          <div className="my-7 h-px flex-grow bg-slate-300" />
        </div>

        <Button
          onClick={submitGoogleHandler}
          variant="ghost"
          colorScheme="blue"
          className="w-full"
          color="black"
          leftIcon={
            <img src={googleIcon.src} alt="Google" className="h-5 w-5" />
          }
        >
          Google
        </Button>
        <div className="mb-2 mt-5 text-center text-xs text-slate-500">
          Already have an account?
        </div>
        <Link href="/login">
          <Button variant="ghost" className="w-full" colorScheme="green">
            Login now
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Page;
