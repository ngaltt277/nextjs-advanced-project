"use client";
import ProductModal from "@/components/products/ProductModal";
import { Product } from "@/lib/db/schema/products";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
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
    id: "action",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductModal product={product} />;
    },
  },
];
