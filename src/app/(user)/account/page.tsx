import UserSettings from "./UserSettings";
import SubscriptionSettings from "./SubscriptionSettings";
import { getUserAuth } from "@/lib/auth/utils";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";

export default async function Account() {
  const { session } = await getUserAuth();
  const { subscriptions } = await getSubscriptionsByUserId();

  return (
    <main>
      <h1 className="text-3xl font-semibold my-6">Account</h1>
      <div className="space-y-6">
        <SubscriptionSettings subscriptions={subscriptions} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
