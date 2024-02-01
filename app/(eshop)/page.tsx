import { productPagination } from "@/actions/products/pagination";
import Paginationn from "@/components/pagination/pagination";
import ProductList from "@/components/products/productList";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await productPagination({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <div>
      <ProductList products={products} />
      <Paginationn totalPages={totalPages} />
    </div>
  );
};

export default Page;
