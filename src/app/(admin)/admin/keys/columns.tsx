"use client";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { Button } from "@/components/ui/button";
import { CompleteSubscription } from "@/lib/db/schema/subscriptions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<CompleteSubscription>[] = [
  {
    accessorKey: "id",
    header: "Key",
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
    cell: ({ row }) => {
      const {
        product: { id, name },
      } = row.original;
      return (
        <Link href={`products/${id}`}>
          <Button variant="link">{name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Subcribed Date",
    cell: ({ row }) => row.original.createdDate?.toLocaleDateString("en-us"),
  },
  {
    accessorKey: "expiredDate",
    header: "Expired Date",
    cell: ({ row }) => row.original.expiredDate?.toLocaleDateString("en-us"),
  },
  {
    id: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
