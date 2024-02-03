import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CiBadgeDollar } from "react-icons/ci";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";
import { getPaginateOrders } from "@/actions/order/get-paginate-orders";
const Page = async () => {
  const { ok, orders } = await getPaginateOrders();


  if (!ok) {
    redirect("/auth/signin");
  }

  return (
    <div className=" bg-white rounded-2xl border">
      <div className="flex items-center p-2">
        <div className="relative  flex w-44 md:w-96">
          <span className="absolute left-1 top-3">
            <MagnifyingGlassIcon className="text-gray-600" />
          </span>
          <input
            placeholder="Search"
            type="text"
            className="w-full text-gray-500 placeholder:text-gray-500  text-sm border  focus:outline-none rounded-2xl py-2.5 pl-8"
          />
        </div>
      </div>

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Subtotal</TableHead>
            <TableHead>Option</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium truncate">{order.id}</TableCell>
              <TableCell>{order.OrderAddress?.firstname}</TableCell>
              <TableCell>{order.OrderAddress?.lastname}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  <span className="flex items-center gap-1 borde-green-200 rounded-2xl text-green-700 text-xs">
                    <CiBadgeDollar size={20} />
                    Paid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 borde-red-200 rounded-2xl text-red-700 text-xs">
                    <CiBadgeDollar size={20} />
                    No Paid
                  </span>
                )}
              </TableCell>
              <TableCell>{order.itemInOrder}</TableCell>
              <TableCell>{currencyFormat(order.total)}</TableCell>
              <TableCell>{currencyFormat(order.subtotal)}</TableCell>
              <TableCell>
                <Link href={`/orders/${order.id}`}>View</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
