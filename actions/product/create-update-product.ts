"use server";
import { v2 as cloudinary } from "cloudinary";
import productSchema from "@/schema/productSchema";
import { Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const createProduct = async (formdata: FormData) => {
  const data = Object.fromEntries(formdata);

  const validatefield = productSchema.safeParse(data);

  if (!validatefield.success) {
    return {
      error: "Invalid field",
    };
  }

  const product = validatefield.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismatx = prisma!.$transaction(async (tx) => {
      let product: Product;
      const tagsarray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma!.product.update({
          where: {
            id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsarray,
            },
          },
        });
      } else {
        product = await prisma!.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsarray,
            },
          },
        });
      }

      //carga y guardado de images
      if (formdata.getAll("images")) {
        const images = await uploadImages(formdata.getAll("images") as File[]);
        if (!images) {
          throw new Error("No se pudo cargar las imágenes, rollingback");
        }

        await prisma!.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    //revalidate path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: (await prismatx).product,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Something went wrong",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    return null;
  }
};
