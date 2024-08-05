import { supabase } from "./supabase";

export async function signUpWithPassword(email: string, password: string) {
  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error signing up: ", error.message);
    throw error;
  }
}

export async function signInWithPassword(email: string, password: string) {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error("Error signing in: ", error.message);
    throw error;
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
