import KeyList from "@/components/keys/KeyList";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";

export default async function Keys() {
  const { subscriptions } = await getSubscriptions();

  return (
    <main className="flex-grow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Keys</h1>
      </div>
      <div className="w-full overflow-auto">
        <KeyList subscriptions={subscriptions} />
      </div>
    </main>
  );
}
