import { getcategories } from "@/actions/category/category";
import { productSlug } from "@/actions/products/product";
import ProductForm from "@/components/product/productForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}
const Page = async ({ params }: Props) => {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    productSlug(slug),
    getcategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }
  const title = slug === "new" ? "New product" : "Edit product";

  return <ProductForm product={product ?? {}} categories={categories} />;
};

export default Page;
