"use server";

import { getSupabaseServerClient } from "@/app/_features/auth/supabase/server";

export async function readUserSession() {
  const supabase = await getSupabaseServerClient();
  return await supabase.auth.getUser();
}
