"use server";

import prisma from "@/lib/prisma";

export const stockSlug = async (slug: string): Promise<Number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: { slug },
      select: { inStock: true },
    });
    return stock?.inStock || 0; // devuelve 0 si no encuentra el producto o el stock si lo encuentra
  } catch (error) {
    return 0; // devuelve 0 si hay un error al obtener el stock del producto
  }
};
