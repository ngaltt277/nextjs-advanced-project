import React from "react";
import KeyChart from "./KeyChart";
import { DataTable } from "@/components/table/DataTable";
import { topCustomersColumns, topProductsColumns } from "./columns";
import { getTopUsers } from "@/lib/api/users/queries";
import { getTopProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByCreatedDate } from "@/lib/api/subscriptions/queries";
import { getTranslations } from "next-intl/server";

const Admin = async () => {
  const products = await getTopProducts();
  const users = await getTopUsers();
  const keys = await getSubscriptionsByCreatedDate();
  const t = await getTranslations("Home");

  return (
    <div className="px-6 mb-6">
      <h1 className="text-3xl font-semibold">{t("welcome")}</h1>
      <div className="grid gap-6 mt-6 grid-cols-2">
        <div className="p-6 bg-white rounded shadow dark:bg-slate-800">
          <h2 className="text-xl font-semibold">{t("top-product")}</h2>
          <div className="mt-2">
            <DataTable columns={topProductsColumns} data={products} />
          </div>
        </div>
        <div className="p-6 bg-white rounded shadow dark:bg-slate-800">
          <h2 className="text-xl font-semibold">{t("top-customer")}</h2>
          <div className="mt-2">
            <DataTable columns={topCustomersColumns} data={users} />
          </div>
        </div>
      </div>
      <KeyChart keys={keys} />
    </div>
  );
};

export default Admin;
