"use client";
import { CompleteUser } from "@/lib/db/schema/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CompleteUser>[] = [
  {
    accessorKey: "id",
    header: "Customer ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "Subscription",
    header: "Num Of Keys",
    cell: ({ row }) => row.original.Subscription.length,
  },
];
