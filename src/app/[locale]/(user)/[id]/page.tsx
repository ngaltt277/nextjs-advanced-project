import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/lib/api/products/queries";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { id: string };
};

export default async function UserProductDetail({ params }: Props) {
  const { product } = await getProductById(params.id);
  const t = await getTranslations("Product");

  if (product) {
    return <ProductDetail product={product} />;
  }

  return <h1>{t("no-results")}</h1>;
}
