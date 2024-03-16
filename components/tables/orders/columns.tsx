"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  CaretSortIcon,
  ChevronLeftIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Order } from "@prisma/client";
import dayjs from "dayjs";
export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "itemInOrder",
    header: "Item Order",
  },

  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
  },

  {
    accessorKey: "tax",
    header: "Taxes",
  },

  {
    accessorKey: "isPaid",
    header: "Paid",
    accessorFn: (paid) => (paid.isPaid ? "Yes" : "No"),
  },

  {
    accessorKey: "paidAt",
    header: "Date paid",
    accessorFn: (p) => {
      if (p.paidAt) {
        return dayjs(p.paidAt).format("DD/MM/YYYY");
      }
    },
  },
  {
    accessorKey: "createAt",
    header: "Creation date",
    accessorFn: (c) => {
      return dayjs(c.createAt).format("DD/MM/YYYY");
    },
  },
  {
    accessorKey: "updateAt",
    header: "Update date",
    accessorFn: (u) => {
      return dayjs(u.updateAt).format("DD/MM/YYYY");
    },
  },

  {
    accessorKey: "transactionId",
    header: "Transaction",
  },
  {
    accessorKey: "userId",
    header: "User",
  },
  {
    accessorKey: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy Order
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/orders/${order.id}`}>View Order</Link>
            </DropdownMenuItem>
            <DropdownMenuItem >
              <Link href={`/orders/print/${order.id}`}>
                Print Order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
