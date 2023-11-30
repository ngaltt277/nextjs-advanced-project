"use client";
import ProductModal from "@/components/products/ProductModal";
import TranslateHeader from "@/components/table/TranslateHeader";
import { CompleteProduct } from "@/lib/db/schema/products";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CompleteProduct>[] = [
  {
    accessorKey: "name",
    header: () => <TranslateHeader message="Product" value="name" />,
  },
  {
    accessorKey: "price",
    header: () => <TranslateHeader message="Product" value="price" />,
  },
  {
    accessorKey: "description",
    header: () => <TranslateHeader message="Product" value="description" />,
  },
  {
    accessorKey: "features",
    header: () => <TranslateHeader message="Product" value="numOfFeatures" />,
    cell: ({ row }) => row.original.features.length,
  },
  {
    id: "action",
    cell: ({ row }) => <ProductModal product={row.original} />,
  },
];
