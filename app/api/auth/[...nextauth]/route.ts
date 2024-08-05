import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/app/_lib/supabase";

const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log(data, error);

        if (error) {
          return null;
        }

        return data.user;
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
