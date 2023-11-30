import { getProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import Home from "./Home";
import ClientProvider from "i18n/client-provider";

export default async function UserHome() {
  const { products } = await getProducts();
  const { subscriptions } = await getSubscriptionsByUserId();

  return (
    <ClientProvider message="Product">
      <Home products={products} subscriptions={subscriptions} />
    </ClientProvider>
  );
}
