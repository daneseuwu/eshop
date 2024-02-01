"use server";
import prisma from "@/lib/prisma";

export const settransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId: transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `Order not found ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "no se pudo actualizar la transaccion",
    };
  }
};

