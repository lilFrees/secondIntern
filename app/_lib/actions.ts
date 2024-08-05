// "use server";

// import { AuthError } from "next-auth";
// import { signIn, signOut } from "./auth";

// import { supabase } from "./supabase";

// export async function signInAction(
//   prevState: { error: string | null },
//   formData: FormData,
// ) {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: "/account",
//     });

//     return { error: null };
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid credentials." };
//         default:
//           return { error: "Something went wrong." };
//       }
//     }
//     throw error;
//   }
// }

// export async function signOutAction() {
//   await supabase.auth.signOut();
//   return { success: true };
// }
