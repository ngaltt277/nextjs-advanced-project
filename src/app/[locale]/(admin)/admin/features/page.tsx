import NewFeatureModal from "@/components/features/FeatureModal";
import { DataTable } from "@/components/table/DataTable";
import { getFeatures } from "@/lib/api/features/queries";
import { columns } from "./columns";

export default async function Feature() {
  const { features } = await getFeatures();

  return (
    <main className="flex-grow px-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Features</h1>
        <NewFeatureModal emptyState />
      </div>
      <div className="w-full overflow-auto">
        <DataTable
          columns={columns}
          data={features}
          filterColumn="name"
          hasPaginations
        />
      </div>
    </main>
  );
}
