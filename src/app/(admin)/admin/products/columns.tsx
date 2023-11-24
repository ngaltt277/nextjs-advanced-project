"use client";
import ProductModal from "@/components/products/ProductModal";
import { CompleteProduct } from "@/lib/db/schema/products";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CompleteProduct>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "features",
    header: "Num of Features",
    cell: ({ row }) => row.original.features.length,
  },
  {
    id: "action",
    cell: ({ row }) => <ProductModal product={row.original} />,
  },
];
