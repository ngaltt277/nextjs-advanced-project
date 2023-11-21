"use client";
import { ClipboardCopy } from "@/components/ClipboardCopy";
import { Button } from "@/components/ui/button";
import { CompleteUser } from "@/lib/db/schema/users";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<CompleteUser>[] = [
  {
    accessorKey: "id",
    header: "Customer ID",
    cell: ({ row }) => <ClipboardCopy content={row.getValue("id")} />,
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "Subscription",
    header: "Num Of Keys",
    cell: ({ row }) => row.original.Subscription.length,
  },
  {
    id: "action",
    cell: ({ row }) => {
      return (
        <Link href={`customers/${row.original.id}`}>
          <Button variant="link">Detail</Button>
        </Link>
      );
    },
  },
];
