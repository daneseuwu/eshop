"use server";
import { auth } from "@/auth";
import { Address } from "@/interfaces/address.interface";
import { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface productToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const order = async (productIds: productToOrder[], address: Address) => {
  const session = await auth();
  const userId = session?.user.id;

  //verified user session
  if (!userId) {
    return {
      ok: false,
      message: "no hay session de usuario",
    };
  }

  //obtener la informacion de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  //calcular los montos
  const itemInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  //colocar taxes

  const { subtotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} Producto no encontrado`);
      }

      const subtotal = product.price * productQuantity;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.05;
      totals.total += subtotal * 1.05;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  try {
    //transaction
    const transaction = await prisma.$transaction(async (tx) => {
      //actualiza stock en la bd del producto
      const updateProductPromise = products.map(async (product) => {
        //acomular dos valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no existe cantidad definida`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updateProducts = await Promise.all(updateProductPromise);

      //verificar valores negativos en el stock
      updateProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`Out of stock for ${product.title}`);
        }
      });

      //crear la orden - emcabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemInOrder: itemInOrder,
          subtotal: subtotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      //Validar, si el precio es cero, retornar un error

      //crear la direccion de la orden

      const { country, ...restaddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restaddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updateProducts: updateProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: transaction.order,
      transaction: transaction,
      success: "Order created",
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
