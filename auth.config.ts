import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import bcryptjs from "bcryptjs";
import signinSchema from "./schema/signin";
import { userbyEmail } from "./actions/user";

export default {
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatefield = signinSchema.safeParse(credentials);

        if (!validatefield.success) {
          throw new Error("Credenciales inválidas: " + validatefield.error);
        }

        const { email, password } = validatefield.data;

        const user = await userbyEmail(email);

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado o contraseña no configurada");
        }

        const passwordMatch = bcryptjs.compareSync(password, user.password);

        if (passwordMatch) {
          const { password: _, ...rest } = user;
          return rest;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
