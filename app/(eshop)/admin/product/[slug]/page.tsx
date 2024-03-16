import { getcategories } from "@/actions/category/category";
import { productSlug } from "@/actions/products/product";
import { auth } from "@/auth";
import ProductForm from "@/components/product/productForm";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}
const Page = async ({ params }: Props) => {
  const { slug } = params;
  
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }

  const [product, categories] = await Promise.all([
    productSlug(slug),
    getcategories(),
  ]);

  if (!product && slug !== "new") {
    redirect("/admin/products");
  }

  return <ProductForm product={product ?? {}} categories={categories} />;
};

export default Page;
