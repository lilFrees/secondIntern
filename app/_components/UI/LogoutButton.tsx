"use client";

import { supabase } from "@/app/_lib/supabase";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  async function logoutHandler() {
    try {
      const { error } = await supabase.auth.signOut({ scope: "local" });

      if (!error) {
        await signOut({
          callbackUrl: "/login",
        });
      }
    } catch (error) {
      console.log("Error logging out:", error);
    }
  }
  return (
    <Button colorScheme="green" onClick={logoutHandler}>
      Logout
    </Button>
  );
}

export default LogoutButton;
