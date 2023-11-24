"use client";
import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { CompleteProduct } from "@/lib/db/schema/products";
import { Subscription } from "@/lib/db/schema/subscriptions";
import { trpc } from "@/lib/trpc/client";
import { useCallback, useState } from "react";

type Props = {
  products: CompleteProduct[];
  subscriptions: Subscription[];
};

export default function Home({ products, subscriptions }: Props) {
  const [filterProducts, setFilterProducts] = useState(products);
  const utils = trpc.useContext();

  const getFilterProducts = useCallback(
    async (name: string) => {
      const response = await utils.products.getProductByName.fetch({
        name,
      });
      setFilterProducts(response);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onchange = (e: any) => {
    getFilterProducts(e.target.value);
  };

  const renderProducts = () => {
    if (filterProducts.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-4">
          {filterProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              subscriptions={subscriptions}
            />
          ))}
        </div>
      );
    }
    return <div className="text-center my-4 font-medium">No results</div>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-muted-foreground dark:text-white">
          Products
        </h3>
        <Input
          placeholder="Search..."
          className="w-1/3 dark:border-white dark:placeholder:text-white"
          onChange={onchange}
        />
      </div>
      {renderProducts()}
    </div>
  );
}
