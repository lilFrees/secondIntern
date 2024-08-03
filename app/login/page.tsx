"use client";

import { Button, Input } from "@chakra-ui/react";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Login</h2>
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username:
          </label>
          <Input id="username" type="username" required />
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password:
          </label>
          <Input id="password" type="password" />
        </div>
        <Button colorScheme="green" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Page;
