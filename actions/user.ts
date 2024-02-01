import prisma from "@/lib/prisma";

export const userbyEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const userbyId = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
