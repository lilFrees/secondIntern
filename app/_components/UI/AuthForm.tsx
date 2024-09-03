"use client";

import googleIcon from "@/public/google-icon.webp";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useUser } from "@/app/_hooks/userStore";

import { signIn, signUpWithEmailNamePassword } from "@/app/_auth/auth-actions";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),

  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name can't be longer than 50 characters"),
});

function AuthForm({ type }: { type: "register" | "login" }) {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, user } = useUser();
  const router = useRouter();
  const toast = useToast();

  if (user) {
    router.push("/");
  }

  function handleActionResult(
    actionData: any,
    error: any,
    successMessage: string,
  ) {
    if (error) {
      console.log(error);
      toast({
        title: "Error 123",
        description: error.message || error.name,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: successMessage,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Handle successful login/registration here (e.g., redirect)
    }
  }

  type LoginSchema = z.infer<typeof loginSchema>;
  type RegisterSchema = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginSchema | RegisterSchema>({
    resolver: zodResolver(type === "login" ? loginSchema : registerSchema),
  });

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  async function onSubmit(data: LoginSchema | RegisterSchema) {
    try {
      if (type === "login") {
        const result = await signIn(data as LoginSchema);
        if (result) {
          const { data: actionData, error } = JSON.parse(result);
          handleActionResult(
            actionData,
            error,
            "You have successfully logged in.",
          );
          setUser(actionData.user);
          router.refresh();
        }
      } else {
        const result = await signUpWithEmailNamePassword(
          data as RegisterSchema,
        );
        if (result) {
          const { data: actionData, error } = JSON.parse(result);
          handleActionResult(
            actionData,
            error,
            "Account created successfully. Please login again",
          );
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong, please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  function isRegisterSchema(
    errors: FieldErrors<LoginSchema | RegisterSchema>,
  ): errors is FieldErrors<RegisterSchema> {
    return type === "register";
  }

  return (
    <div className="mx-auto flex h-screen max-w-lg flex-col items-center justify-center">
      <form
        className="mb-5 w-full rounded bg-white p-8 shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-8 text-center text-2xl font-bold">
          {type === "login" ? "Login to your account" : "Create an Account"}
        </h2>
        {type === "register" && (
          <div className="mb-4">
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Your name:
              </FormLabel>
              <Input id="name" type="name" {...register("name")} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
          </div>
        )}
        <div className="mb-4">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email:
            </FormLabel>
            <Input id="email" type="email" {...register("email")} />
            <FormErrorMessage>
              {isRegisterSchema(errors) && errors.name?.message}
            </FormErrorMessage>
          </FormControl>
        </div>
        <div className="mb-4">
          <FormControl isInvalid={!!errors.password}>
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
                {...register("password")}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </div>
        <FormErrorMessage>{errors.root?.message}</FormErrorMessage>
        <div className="mb-4"></div>
        <Button
          colorScheme="green"
          type="submit"
          isLoading={isSubmitting}
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          {type === "login" ? "Login" : "Register"}
        </Button>

        <div className="flex w-full items-center gap-2">
          <div className="my-7 h-px flex-grow bg-slate-300" />
          <p className="w-max text-xs text-slate-500">Or Continue With</p>
          <div className="my-7 h-px flex-grow bg-slate-300" />
        </div>

        <Button
          variant="ghost"
          colorScheme="blue"
          className="w-full"
          color="black"
          type="button"
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
