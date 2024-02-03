"use client";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Product } from "@/interfaces/product.interface";
import clsx from "clsx";
import { Category } from "@/interfaces/category.interface";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductImage } from "@/interfaces/productImage.interface";
import { createProduct } from "@/actions/product/create-update-product";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProductImages from "./image/productImage";
import { deleteProductImage } from "@/actions/product/delete-product-image";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export interface ProductForm {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images?: FileList;
}

const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<ProductForm>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(","),
      sizes: product.sizes ?? [],
      gender: product.gender,
      images: undefined,
    },
  });

  watch("sizes");

  const onSubmit = async (data: ProductForm) => {
    const formdata = new FormData();

    const { images, ...productSave } = data;

    if (product.id) {
      formdata.append("id", product.id ?? "");
    }
    formdata.append("title", productSave.title);
    formdata.append("slug", productSave.slug);
    formdata.append("description", productSave.description);
    formdata.append("price", productSave.price.toString());
    formdata.append("inStock", productSave.inStock.toString());
    formdata.append("sizes", productSave.sizes.toString());
    formdata.append("categoryId", productSave.categoryId);
    formdata.append("tags", productSave.tags);
    formdata.append("gender", productSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formdata.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createProduct(formdata);
    if (ok) {
      toast.success("Product updated successfully");
      router.replace(`/admin/product/${updatedProduct?.slug}`);
    } else {
      toast.success("Product add product");
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues("sizes"));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue("sizes", Array.from(sizes));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border">
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-3">
              <Label>Product name</Label>
              <Input
                type="text"
                {...register("title", {
                  required: true,
                })}
              />
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>Stock</Label>
                <Input
                  type="text"
                  {...register("inStock", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="text"
                  {...register("price", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>Tags</Label>
                <Input
                  type="text"
                  {...register("tags", {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-3">
                <Label>Gender</Label>
                <select
                  className="block w-full rounded-2xl border  border-gray-200 py-2 text-sm shadow-sm focus:outline-none"
                  {...register("gender", {
                    required: true,
                  })}
                >
                  <option value="">Select</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kid">Kid</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <Label>Category</Label>
              <select
                className="block w-[330px] rounded-2xl border  border-gray-200 py-2 text-sm shadow-sm focus:outline-none"
                {...register("categoryId", {
                  required: true,
                })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <Label>Product slug</Label>
              <Input
                type="text"
                {...register("slug", {
                  required: true,
                })}
              />
            </div>

            <div className="mb-3">
              <Label>Description</Label>
              <Textarea
                rows={4}
                {...register("description", {
                  required: true,
                })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={!isValid}>
              Save
            </Button>
          </CardFooter>
        </div>

        <div className="rounded-2xl border">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mb-3 flex flex-col">
              <Label>Size</Label>
              <div className="grid grid-cols-3 gap-1 pt-1 md:flex">
                {sizes.map((size) => (
                  <button
                    type="button"
                    onClick={() => onSizeChanged(size)}
                    key={size}
                    {...register("sizes", {
                      required: true,
                    })}
                    className={clsx(
                      "h-8 rounded-2xl border px-3 text-center text-xs shadow-sm  transition-all hover:bg-gray-100",
                      {
                        "h-8 rounded-2xl bg-gray-900 px-3 text-center text-xs text-gray-50 shadow transition-all hover:bg-gray-900/90":
                          getValues("sizes").includes(size),
                      }
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <Label>Image</Label>
              <Input
                type="file"
                multiple={true}
                className="appearance-none border hover:cursor-pointer hover:border-gray-300"
                accept="image/png, image/jpeg, image/avif"
                {...register("images", {
                  required: true,
                })}
              />
              <CardDescription>
                Image size should be less than 2MB
              </CardDescription>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
              {product.ProductImage?.map((image) => (
                <div key={image.id}>
                  <ProductImages
                    src={image.url}
                    alt={product.title ?? ""}
                    width={200}
                    height={200}
                    className="w-50 h-50 rounded object-cover pb-2"
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="w-full"
                    onClick={() => deleteProductImage(image.id, image.url)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
