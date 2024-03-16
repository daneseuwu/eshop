"use server ";
import prisma from "@/lib/prisma";

export const getProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      title: "desc",
    },
  });

  return {
    ok: true,
    products,
  };
};
