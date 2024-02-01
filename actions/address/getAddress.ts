"use server";

import prisma from "@/lib/prisma";

export const getAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!address) {
      return null;
    }

    const { countryId, instructions, ...rest } = address;
    return {
      ...address,
      instructions: instructions ? instructions : "",
    };
  } catch (error) {
    throw new Error("upps parace que ha ocurrido un error");
  }
};
