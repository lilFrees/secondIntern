"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button colorScheme="green" onClick={() => signOut()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
