"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypaltransactionId: string) => {
  const authtoken = await getPaypalToken();

  if (!authtoken) {
    return {
      ok: false,
      message: "Error al obtener el token de paypal",
    };
  }

  const res = await verifyPaypalPayment(paypaltransactionId, authtoken);
  if (!res) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = res;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Pago no completado",
    };
  }

  //TODO: realizar la actualizacion de la orden en la base de datos
  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //revalidar path para refrescar
    revalidatePath(`/order/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    }
  }
};

const getPaypalToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET;
  const auth2url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(auth2url, {
      ...requestOptions,
      cache: "no-store",
    });
    const result = await response.json();
    return result.access_token;
  } catch (error) {
    return null;
  }
};

const verifyPaypalPayment = async (
  paypaltransactionId: string,
  bearerToken: string
) => {
  if (!paypaltransactionId) {
    return null;
  }

  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypaltransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    });
    const result = await response.json();
    return result;
  } catch (error) {
   return null
  }
};
