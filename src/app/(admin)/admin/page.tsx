import React from "react";
import KeyChart from "./KeyChart";
import { DataTable } from "@/components/table/DataTable";
import { topCustomersColumns, topProductsColumns } from "./columns";
import { getTopUsers } from "@/lib/api/users/queries";
import { getTopProducts } from "@/lib/api/products/queries";
import { getSubscriptionsByCreatedDate } from "@/lib/api/subscriptions/queries";

const Admin = async () => {
  const products = await getTopProducts();
  const users = await getTopUsers();
  const keys = await getSubscriptionsByCreatedDate();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">Welcome back!</h1>
      <div className="grid gap-6 mt-6 grid-cols-2">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Top Products</h2>
          <div className="mt-2">
            <DataTable columns={topProductsColumns} data={products} />
          </div>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold">Top Customers</h2>
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
