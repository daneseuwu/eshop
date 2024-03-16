import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "@/auth.config";
import prisma from "./lib/prisma";
import { userbyId } from "./actions/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/auth/error",
  },

  callbacks: {

    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user = token.data as any;
      return session;
    },
  },

  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
