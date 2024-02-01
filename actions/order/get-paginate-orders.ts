"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getPaginateOrders = async () => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    return {
      error: "Unauthorized",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createAt: "desc",
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
