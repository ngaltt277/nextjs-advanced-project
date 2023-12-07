import { DataTable } from "@/components/table/DataTable";
import { columns } from "./columns";
import { getOrders } from "@/lib/api/orders/queries";

export default async function Feature() {
  const { orders } = await getOrders();

  return (
    <main className="flex-grow px-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Orders</h1>
      </div>
      <div className="w-full overflow-auto">
        <DataTable
          columns={columns}
          data={orders}
          filterColumn="name"
          hasPaginations
        />
      </div>
    </main>
  );
}
