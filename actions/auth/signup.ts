"use server";

import signupSchema from "@/schema/signup";
import z from "zod";
import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";
import { userbyEmail } from "../user";

export const signup = async (values: z.infer<typeof signupSchema>) => {
  const validatefield = signupSchema.safeParse(values);

  if (!validatefield.success) {
    return {
      error: "Invalid field",
    };
  }

  const { firstname, lastname, email, password } = validatefield.data;
  const passwordhash = bcryptjs.hashSync(password, 10);

  const existuser = await userbyEmail(email);

  if (existuser) {
    return {
      ok: false,
      error: "Email already exist",
    };
  }
  await prisma.user.create({
    data: {
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: passwordhash,
    },
  });

  return {
    ok: true,
    success: "User created successfully",
  };
};
