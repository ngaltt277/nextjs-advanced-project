import { CompleteProduct } from "@/lib/db/schema/products";
import { CheckCircleIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  product: CompleteProduct | null;
};

export default function ProductDetail({ product }: Props) {
  const t = useTranslations("Product");

  const renderProductInfo = (label: string, value: any) => {
    return (
      <div className="flex mb-4 gap-4">
        <p className="w-1/3 text-base font-semibold">{label}</p>
        <div className="w-2/3">{value || "none"}</div>
      </div>
    );
  };

  return (
    <main className="flex-grow px-6 mb-6">
      <div className="flex gap-2 items-center mb-4">
        <Link
          href="/admin/products"
          className="text-lg font-medium text-stone-500 hover:underline"
        >
          {t("title")}
        </Link>
        <ChevronRightIcon />
        <h1 className="text-lg font-medium flex gap-4 items-center">
          {product?.name}
        </h1>
      </div>
      <div className="w-full">
        <div className="flex items-center gap-4 my-4">
          <h2 className="text-lg font-medium text-green-600">
            {t("information")}
          </h2>
          <div className="bg-border h-[1px] flex-1"></div>
        </div>
        <div className="flex px-4">
          <div className="flex-auto">
            {renderProductInfo(t("name"), product?.name)}
            {renderProductInfo(t("description"), product?.description)}
          </div>
          <div className="flex-auto">
            {renderProductInfo(
              t("price"),
              `$${product?.price && product?.price / 100}`
            )}
            {renderProductInfo(t("numOfKeys"), product?.subscriptions.length)}
          </div>
        </div>
        <div className="flex items-center gap-4 my-4">
          <h2 className="text-lg font-medium text-green-600">{t("features")}</h2>
          <div className="bg-border h-[1px] flex-1"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 my-4 px-4">
          {product?.features.map((feature) => (
            <div className="mt-4 flex gap-2" key={feature.id}>
              <CheckCircleIcon className="text-green-600" />
              <span className="text-base">{feature.name}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
