"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const orderByUser = async () => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      OrderAddress: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders,
    succcess: "Orders found",
  };
};
