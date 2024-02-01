import prisma from "../lib/prisma";
import { countries } from "./countries/countries";
import { initialData } from "./products/products";

const main = async () => {
  //borrar registros con prisma en postgress
  await Promise.all([
    prisma.orderAddress.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),

    prisma.userAddress.deleteMany(),
    prisma.user.deleteMany(),
    prisma.country.deleteMany(),

    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
  });

  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoryDb = await prisma.category.findMany();

  const categoriesMap = categoryDb.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Ejecutado correctamente");
};

(() => {
  if (process.env.NODE_ENV === "production") {
    console.log("No ejecutar en produccion");
    return;
  } else {
    main();
  }
})();
