import UserSettings from "./UserSettings";
import OrderSettings from "./OrderSettings";
import { getUserAuth } from "@/lib/auth/utils";
import { getOrdersByUserId } from "@/lib/api/orders/queries";
import { getTranslations } from "next-intl/server";

export default async function Account() {
  const { session } = await getUserAuth();
  const { orders } = await getOrdersByUserId();
  const t = await getTranslations("Account");

  return (
    <main>
      <h1 className="text-3xl font-semibold my-6">{t("label")}</h1>
      <div className="space-y-6">
        <OrderSettings orders={orders} />
        <UserSettings session={session} />
      </div>
    </main>
  );
}
