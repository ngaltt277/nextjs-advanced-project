"use client";
import FeatureModal from "@/components/features/FeatureModal";
import { Feature } from "@/lib/db/schema/features";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Feature>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    id: "action",
    cell: ({ row }) => <FeatureModal feature={row.original} />,
  },
];
