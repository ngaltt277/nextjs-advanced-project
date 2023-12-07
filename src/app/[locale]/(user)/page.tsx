import { getProducts } from "@/lib/api/products/queries";
import Home from "./Home";

export default async function UserHome() {
  const { products } = await getProducts();

  return <Home products={products} />;
}
