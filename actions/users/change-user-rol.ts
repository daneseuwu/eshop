"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRol = async (userId: string, rol: string) => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      ok: false,
      error: "Unauthorized",
    };
  }
  try {
    const newRol = rol === "admin" ? "admin" : "user";
    
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        rol: newRol,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Error al cambiar el rol del usuario",
    };
  }
};
