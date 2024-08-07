"use client";

import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { supabase } from "@/app/_lib/supabase";

export function useAuthSync() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && !session) {
        const { email } = (session as any)?.user || {};

        if (email) {
          await signIn("credentials", { email, redirect: false });
        }
      } else if (event === "SIGNED_OUT" && session) {
        await signOut({ redirect: false });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { session, status };
}
