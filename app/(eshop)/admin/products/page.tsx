import Datatable from "@/components/tables/products/datatable";
import { columns } from "@/components/tables/products/columns";
import { getProducts } from "@/actions/products/products";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  const { ok, products } = await getProducts();
  console.log({products})

  if (!session) {
    redirect("/auth/signin");
  } else if (!ok) {
    redirect("/auth/signin");
  }
  return <Datatable columns={columns} data={products} />;
};

export default Page;
