"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginateUser = async () => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      error: "Unauthorized",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      firstname: "desc",
    },
  });

  return {
    ok: true,
    users: users,
  };
};
