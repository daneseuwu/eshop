"use server";
import signinSchema from "@/schema/signin";
import { z } from "zod";
import { userbyEmail } from "../user";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { default_login_redirect } from "@/routes";

export const signin = async (values: z.infer<typeof signinSchema>) => {
  const validatefield = signinSchema.safeParse(values);

  if (!validatefield.success) {
    return {
      error: "Invalid field",
    };
  }

  const { email, password } = validatefield.data;

  const existuser = await userbyEmail(email);

  if (!existuser || !existuser.email) {
    return {
      ok: false,
      error: "Email does not exist",
    };
  }

  try {
    await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirectTo: default_login_redirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid password",
          };

        default:
          return {
            error: "Oops something went wrong :3",
          };
      }
    }
    throw error;
  }
};
