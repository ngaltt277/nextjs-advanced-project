import { getProductById } from "@/lib/api/products/queries";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function ProductDetail({ params }: Props) {
  const { products } = await getProductById(params.id);

  const renderProductInfo = (label: string, value: any) => {
    return (
      <div className="flex mb-4">
        <p className="w-1/3 text-base font-medium">{label}</p>
        <div className="w-2/3">{value || "none"}</div>
      </div>
    );
  };

  return (
    <main className="flex-grow p-6">
      <div className="flex gap-2 items-center mb-4">
        <Link
          href="/admin/products"
          className="text-lg font-medium text-stone-500 hover:underline"
        >
          Products
        </Link>
        <ChevronRightIcon />
        <h1 className="text-lg font-medium flex gap-4 items-center">
          {products?.name}
        </h1>
      </div>
      <div className="w-full overflow-auto">
        <div className="flex">
          <div className="flex-auto">
            {renderProductInfo("Name", products?.name)}
            {renderProductInfo("Description", products?.description)}
          </div>
          <div className="flex-auto">
            {renderProductInfo(
              "Price",
              `$${products?.price && products?.price / 100}`
            )}
            {renderProductInfo("Num of keys", products?.subscriptions.length)}
          </div>
        </div>
      </div>
    </main>
  );
}
