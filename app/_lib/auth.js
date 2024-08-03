import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";

const authConfig = {
  providers: [
    credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
