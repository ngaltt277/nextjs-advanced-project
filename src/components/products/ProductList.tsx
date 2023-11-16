"use client";
import { Product as ProductType } from "@/lib/db/schema/products";
import { trpc } from "@/lib/trpc/client";
import Product from "./Product";

type Props = {
  products: ProductType[];
};

export default function ProductList({ products }: Props) {
  const { data: p } = trpc.products.getProducts.useQuery(undefined, {
    initialData: { products },
    refetchOnMount: false,
  });

  if (p.products.length === 0) {
    return <EmptyState />;
  }

  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&amp;_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Name
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Price
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Description
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"></th>
        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
}

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
    </div>
  );
};
