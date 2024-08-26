"use client";

import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/app/_helpers/validate-form";
import {
  signInWithPassword,
  signUpWithPassword
} from "@/app/_lib/user-service";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AuthForm({ type }: { type: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const [nameError, setNameError] = useState("");

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function loginHandler(e) {
    e.preventDefault();
    if (type === "register") {
      const emailError = validateEmail(email);
      const passwordError = validatePassword(password);

      setEmailError(emailError);
      setPasswordError(passwordError);

      if (emailError || passwordError) {
        return;
      }
    }

    const error = await signInWithPassword(email, password);
    if (error) {
      setCredentialsError(error);
    }
  }

  async function registerHandler(e) {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const nameError = validateName(name);

    setEmailError(emailError);
    setPasswordError(passwordError);
    setNameError(nameError);

    if (emailError || passwordError || nameError) {
      return;
    }

    const error = await signUpWithPassword(email, password, name);
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
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={nameError !== ""}
              errorBorderColor={passwordError !== "" ? "crimson" : ""}
            />
            {nameError && (
              <p className="mt-1 text-sm text-red-500">{nameError}</p>
            )}
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
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={emailError !== ""}
            errorBorderColor={passwordError !== "" ? "crimson" : ""}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
          )}
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError !== ""}
              errorBorderColor={passwordError !== "" ? "crimson" : ""}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {passwordError && (
            <p className="mt-1 text-sm text-red-500">{passwordError}</p>
          )}
        </div>
        {credentialsError && (
          <p className="mt-1 text-sm text-red-500">{credentialsError}</p>
        )}
        <div className="mb-4"></div>
        <Button colorScheme="green" type="submit" className="w-full">
          {type === "login" ? "Login" : "Register"}
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
