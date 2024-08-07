"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button
      colorScheme="green"
      onClick={async () =>
        await signOut({
          callbackUrl: "/login",
        })
      }
    >
      Logout
    </Button>
  );
}

export default LogoutButton;
