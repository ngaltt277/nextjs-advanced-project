import { DataTable } from "@/components/table/DataTable";
import { getUsers } from "@/lib/api/users/queries";
import { columns } from "./columns";

export default async function Customers() {
  const { users } = await getUsers();

  return (
    <main className="flex-grow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Customers</h1>
      </div>
      <div className="w-full overflow-auto">
        <DataTable
          columns={columns}
          data={users}
          filterColumn="firstName"
          hasPaginations
        />
      </div>
    </main>
  );
}
