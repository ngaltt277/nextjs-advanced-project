"use client";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { Button } from "@/components/ui/button";
import { CompleteOrder } from "@/lib/db/schema/orders";
import { formatDate } from "@/utils/date";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<CompleteOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <ClipboardCopy content={row.getValue("id")} />,
  },
  {
    accessorKey: "user",
    header: "Customer Name",
    cell: ({ row }) => {
      const {
        user: { id, firstName, lastName },
      } = row.original;

      return (
        <Link href={`customers/${id}`}>
          <Button variant="link">{firstName + " " + lastName}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product Name",
    cell: ({ row }) => row.original.Product.name,
  },
  {
    accessorKey: "subscriptions",
    header: "Keys",
    cell: ({ row }) => {
      return row.original.subscriptions.map((subscription) => (
        <li key={subscription.id}>{subscription.id}</li>
      ));
    },
  },
  {
    accessorKey: "expiredDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expired Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{formatDate(row.original.expiredDate)}</div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const expiredDate = row.original.expiredDate?.getTime();
      if (expiredDate && expiredDate < new Date().getTime()) {
        return (
          <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
            Expired
          </span>
        );
      }
      return (
        <span className="px-2 py-1 bg-green-200 text-green-800 rounded-md">
          Using
        </span>
      );
    },
  },
];
