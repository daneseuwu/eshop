"use server";

import prisma from "@/lib/prisma";
import { Address } from "@/interfaces/address.interface";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    throw new Error("No se pudo grabar la dirección");
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });
    const addressToSave = {
      userId: userId,
      firstname: address.firstname,
      lastname: address.lastname,
      address: address.address,
      postalCode: address.postalCode,
      city: address.city,
      countryId: address.country,
      phone: address.phone,
      instructions: address.instructions,
    };
    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    throw new Error("upps parece que hay un error del lado del servidor");
  }
};
