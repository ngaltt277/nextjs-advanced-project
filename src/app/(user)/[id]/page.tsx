import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/lib/api/products/queries";

type Props = {
  params: { id: string };
};

export default async function UserProductDetail({ params }: Props) {
  const { product } = await getProductById(params.id);

  return <ProductDetail product={product} />;
}
