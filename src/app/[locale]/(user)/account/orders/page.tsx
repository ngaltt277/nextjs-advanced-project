import OrderCard from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { getOrdersByUserId } from "@/lib/api/orders/queries";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function Billing() {
  const { orders } = await getOrdersByUserId();
  const t = await getTranslations("Order");

  const renderOrders = () => {
    if (orders.length > 0) {
      return orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ));
    }
    return <p className="w-1/3 text-base font-medium">{t("empty")}</p>;
  };

  return (
    <div className="min-h-[calc(100vh-57px)] ">
      <Link href="/account">
        <Button variant={"link"} className="px-0">
          {t("back")}
        </Button>
      </Link>
      <h1 className="text-3xl font-semibold mb-4">{t("title")}</h1>
      <div className="w-full">
        {renderOrders()}
      </div>
    </div>
  );
}
