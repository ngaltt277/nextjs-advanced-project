import ProductCard from "@/components/products/ProductCard";
import { getProducts } from "@/lib/api/products/queries";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";

export default async function UserHome() {
  const { products } = await getProducts();
  const { subscriptions } = await getSubscriptions();

  return (
    <main className="space-y-6">
      <h3 className="text-lg font-bold text-muted-foreground">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            subscriptions={subscriptions}
          />
        ))}
      </div>
    </main>
  );
}
