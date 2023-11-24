import { getProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import Home from "./Home";

export default async function UserHome() {
  const { products } = await getProducts();
  const { subscriptions } = await getSubscriptionsByUserId();

  return <Home products={products} subscriptions={subscriptions} />;
}
