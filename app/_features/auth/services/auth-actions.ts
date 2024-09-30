"use server";

import { getSupabaseServerClient } from "../supabase/server";

export async function signUpWithEmailNamePassword(data: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await getSupabaseServerClient();

  console.log("action");
  if (supabase) {
    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    });

    if (error) {
      console.log(error);
    }

    return JSON.stringify({ data: signUpData, error });
  }
}

export async function signIn(data: { email: string; password: string }) {
  const supabase = await getSupabaseServerClient();

  console.log("action");
  if (supabase) {
    const { data: signInData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      console.log(error);
    }

    return JSON.stringify({ data: signInData, error });
  }
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();

  console.log("action");
  if (supabase) {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return JSON.stringify({ error });
  }
}
