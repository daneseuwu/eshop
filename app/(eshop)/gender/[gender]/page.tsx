import { productPagination } from "@/actions/products/pagination";
import Paginationn from "@/components/pagination/pagination";
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

  const { products, totalPages } = await productPagination({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <main>
      <ProductList products={products} />
      <Paginationn totalPages={totalPages} />
    </main>
  );
};

export default Page;
