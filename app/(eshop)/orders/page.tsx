import { orderByUser } from "@/actions/order/orderuser";
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
const Page = async () => {
  const { ok, orders } = await orderByUser();

  if (!ok) {
    redirect("/auth/signin");
  }

  return (
    <div className=" rounded-2xl border bg-white">
      <div className="flex items-center p-2">
        <div className="relative  flex w-44 md:w-96">
          <span className="absolute left-1 top-3">
            <MagnifyingGlassIcon className="text-gray-600" />
          </span>
          <input
            placeholder="Search"
            type="text"
            className="w-full rounded-xl border  py-2.5 pl-8  text-sm text-gray-500 placeholder:text-gray-500 focus:outline-none"
          />
        </div>
      </div>

      <Table>
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
              <TableCell className="truncate font-medium">{order.id}</TableCell>
              <TableCell>{order.OrderAddress?.firstname}</TableCell>
              <TableCell>{order.OrderAddress?.lastname}</TableCell>
              <TableCell>
                {order.isPaid ? (
                  <span className="borde-green-200 flex items-center gap-1 rounded-2xl text-xs text-green-700">
                    <CiBadgeDollar size={20} />
                    Paid
                  </span>
                ) : (
                  <span className="borde-red-200 flex items-center gap-1 rounded-2xl text-xs text-red-700">
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
