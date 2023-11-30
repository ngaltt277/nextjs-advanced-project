import NewProductModal from "@/components/products/ProductModal";
import { getProducts } from "@/lib/api/products/queries";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { getTranslations } from "next-intl/server";
import ClientProvider from "i18n/client-provider";

export default async function Products() {
  const { products } = await getProducts();
  const t = await getTranslations("Product");

  return (
    <ClientProvider message="Product">
      <main className="flex-grow px-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">{t("title")}</h1>
          <NewProductModal emptyState />
        </div>
        <div className="w-full">
          <DataTable
            columns={columns}
            data={products}
            filterColumn="name"
            hasPaginations
          />
        </div>
      </main>
    </ClientProvider>
  );
}
