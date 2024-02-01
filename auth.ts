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
    async signIn({ user, account }) {
      //allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      //prevent signin in without email verification
      try {
        const existuser = await userbyId(user.id as string);
      } catch (error) {
        console.error("Error al obtener el usuario por ID:", error);
        return false;
      }

      //add 2FA check
      return true;
    },

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
