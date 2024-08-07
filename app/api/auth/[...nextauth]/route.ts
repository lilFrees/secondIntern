import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "text" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !email) return null;

        // We'll use this provider just for session management, not actual auth
        const user = { id: email, email };
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.userId;
      session.user.email = token.email;
      session.accessToken = token.accessToken;

      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);

export const { POST, GET } = handlers;
