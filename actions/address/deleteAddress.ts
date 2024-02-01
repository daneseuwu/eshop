"use server";
import prisma from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {
  try {
    await prisma.userAddress.deleteMany({
      where: {
        userId,
      },
    });
    return {
      message: "removed",
    };
  } catch (error) {
    return {
      message: "not removed",
    };
  }
};
