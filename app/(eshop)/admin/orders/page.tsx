import DataTable from "@/components/tables/orders/datatable";

import { getPaginateOrders } from "@/actions/order/get-paginate-orders";
import { redirect } from "next/navigation";
import { columns } from "@/components/tables/orders/columns";
import { auth } from "@/auth";

const Page = async () => {
  const session = await auth();
  const { ok, orders } = await getPaginateOrders();

  if (!session) {
    redirect("/auth/signin");
  } else if (!ok) {
    redirect("/auth/signin");
  }

  return <DataTable columns={columns} data={orders} />;
};

export default Page;
