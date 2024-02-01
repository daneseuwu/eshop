"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export const orderId = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw `${id} Order not found`;
    }

    if (session.user.rol === "user") {
      if (session.user.id !== order.userId) {
        throw "Unauthorized";
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    return {
      ok: false,
      message: "upps error del lado del servidor",
    };
  }
};
