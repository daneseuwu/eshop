import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      password: string;
      emailVerified?: boolean;
      image?: string;
      rol: string;
    } & DefaultSession["user"];
  }
}
