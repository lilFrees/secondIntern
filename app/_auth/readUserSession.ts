"use server";

import { getSupabaseServerClient } from "@/app/_lib/supabase/server";

export async function readUserSession() {
  const supabase = await getSupabaseServerClient();
  return await supabase.auth.getUser();
}
