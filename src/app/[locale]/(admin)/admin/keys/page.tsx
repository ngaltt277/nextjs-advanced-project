import { DataTable } from "@/components/table/DataTable";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";
import { columns } from "./columns";

export default async function Keys() {
  const { subscriptions } = await getSubscriptions();

  return (
    <main className="flex-grow px-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Keys</h1>
      </div>
      <div className="w-full overflow-auto">
        <DataTable
          columns={columns}
          data={subscriptions}
          filterColumn="id"
          hasPaginations
        />
      </div>
    </main>
  );
}
