"use client";

import { getSupabaseClient } from "@/app/_lib/supabase/client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/_auth/auth-actions";
import { useUser } from "@/app/_hooks/userStore";

const supabase = getSupabaseClient();

function LogoutButton() {
  const router = useRouter();
  const { clearUser } = useUser();
  async function logoutHandler() {
    try {
      const result = await signOut();

      if (result) {
        const { error } = JSON.parse(result);

        if (!error) {
          clearUser();
          router.refresh();
        }
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
