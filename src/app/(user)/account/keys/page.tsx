import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import Link from "next/link";

export default async function Billing() {
  const { products } = await getProducts();
  const { subscriptions } = await getSubscriptionsByUserId();

  return (
    <div className="min-h-[calc(100vh-57px)] ">
      <Link href="/account">
        <Button variant={"link"} className="px-0">
          Back
        </Button>
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Subscription Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {subscriptions.map((subscription) => (
          <ProductCard
            key={subscription.id}
            product={subscription.product}
            subscriptions={subscriptions}
          />
        ))}
      </div>
    </div>
  );
}
