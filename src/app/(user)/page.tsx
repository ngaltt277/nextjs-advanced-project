import ProductCard from "@/components/products/ProductCard";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";

export default async function UserHome() {
  const { products } = await getProducts();
  const { subscriptions } = await getSubscriptionsByUserId();

  return (
    <div className="space-y-6 mb-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-muted-foreground">Products</h3>
        <Input placeholder="Search..." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            subscriptions={subscriptions}
          />
        ))}
      </div>
    </div>
  );
}
