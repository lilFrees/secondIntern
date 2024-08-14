"use client";

import {
  signInWithGoogle,
  signInWithPassword,
  signUpWithPassword,
} from "@/app/_lib/user-service";
import googleIcon from "@/public/google-icon.webp";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthForm({ type }: { type: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function submitGoogleHandler(e) {
    e.preventDefault();
    try {
      const data = await signInWithGoogle();

      if (data) {
        console.log("success");
      }
    } catch (error) {
      console.log("Error signing in with Google ", error);
    }
  }

  async function loginHandler(e) {
    e.preventDefault();
    signInWithPassword(email, password);
  }

  async function registerHandler(e) {
    e.preventDefault();
    signUpWithPassword(email, password, name);
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center">
      <form
        className="mb-5 w-full rounded bg-white p-8 shadow-xl"
        onSubmit={type === "login" ? loginHandler : registerHandler}
      >
        <h2 className="mb-8 text-center text-2xl font-bold">
          {type === "login" ? "Login to your account" : "Create an Account"}
        </h2>
        {type === "register" && (
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="name"
            >
              Your name:
            </label>
            <Input
              id="name"
              type="name"
              required
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
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
            name="email"
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
          <InputGroup>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              name="email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </div>

        <Button colorScheme="green" type="submit" className="w-full">
          {type === "login" ? "Login" : "Register"}
        </Button>

        <div className="flex w-full items-center gap-2">
          <div className="my-7 h-px flex-grow bg-slate-300" />
          <p className="w-max text-xs text-slate-500">Or Continue With</p>
          <div className="my-7 h-px flex-grow bg-slate-300" />
        </div>

        <Button
          onClick={submitGoogleHandler}
          variant="ghost"
          colorScheme="blue"
          className="w-full"
          color="black"
          leftIcon={
            <Image height={20} width={20} src={googleIcon} alt="Google" />
          }
        >
          Google
        </Button>
        <div className="mb-2 mt-5 text-center text-xs text-slate-500">
          {type === "login"
            ? "Don't have an account yet?"
            : "Already have an account?"}
        </div>
        <Link href={type === "login" ? "/register" : "/login"}>
          <Button variant="ghost" className="w-full" colorScheme="green">
            {type === "login" ? "Create new account" : "Login now"}
          </Button>
        </Link>
      </form>
    </div>
  );
}

export default AuthForm;
