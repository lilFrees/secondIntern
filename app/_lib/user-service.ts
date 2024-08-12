import { signIn } from "next-auth/react";
import { supabase } from "./supabase";

export async function signUpWithPassword(
  email: string,
  password: string,
  name: string,
) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullName: name,
        },
      },
    });

    if (!error) {
      await signIn("credentials", {
        email,
        password,

        redirect: true,
        callbackUrl: "/",
      });
    }
  } catch {
    console.log("error");
  }
}

export async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  } catch {
    console.log("error");
  }
}

export async function signOut() {
  try {
    let { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  } catch (error: any) {
    console.error("Error signing out: ", error.message);
    throw error;
  }
}

export async function getSession() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return null;
    }

    return session;
  } catch (error: any) {
    console.error("Error fetching user: ", error.message);
    throw error;
  }
}

export async function getUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  } catch (error: any) {
    console.error("Error fetching user: ", error.message);
    throw error;
  }
}

export async function signInWithGoogle() {
  try {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error signing in with Google: ", error.message);
    throw error;
  }
}
