import { productPagination } from "@/actions/products/pagination";
import ProductList from "@/components/products/productList";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await productPagination({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default Page;
