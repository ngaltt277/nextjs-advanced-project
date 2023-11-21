"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const topProductsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "subscriptions",
    header: "Num of keys",
      cell: ({ row }) => row.original._count.subscriptions,
  },
];

export const topCustomersColumns: ColumnDef<any>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { imageUrl, firstName, lastName } = row.original;
      return (
        <h1 className="flex gap-4 items-center">
          <Avatar className="w-8 h-8">
            <AvatarImage src={imageUrl || ""} alt="@shadcn" />
            <AvatarFallback>{firstName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {firstName + " " + lastName}
        </h1>
      );
    },
  },
  {
    accessorKey: "Subscription",
    header: "Num of keys",
    cell: ({ row }) => row.original._count.Subscription,
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <Link href={`/admin/customers/${row.original.id}`}>
          <Button variant="link">Detail</Button>
        </Link>
      );
    },
  },
];
