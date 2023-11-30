import UserSettings from "./UserSettings";
import SubscriptionSettings from "./SubscriptionSettings";
import { getUserAuth } from "@/lib/auth/utils";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import { getTranslations } from "next-intl/server";
import ClientProvider from "i18n/client-provider";

export default async function Account() {
  const { session } = await getUserAuth();
  const { subscriptions } = await getSubscriptionsByUserId();
  const t = await getTranslations("Account");

  return (
    <main>
      <h1 className="text-3xl font-semibold my-6">{t("label")}</h1>
      <div className="space-y-6">
        <ClientProvider message="Account">
          <SubscriptionSettings subscriptions={subscriptions} />
          <UserSettings session={session} />
        </ClientProvider>
      </div>
    </main>
  );
}
