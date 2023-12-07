"use client";
import { AccountCard, AccountCardFooter } from "./AccountCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Order } from "@/lib/db/schema/orders";

type Props = {
  orders: Order[];
};

export default function OrderSettings({ orders }: Props) {
  const t = useTranslations("Account.keys");

  return (
    <AccountCard
      params={{
        header: t("title"),
        description:
          orders.length > 0
            ? t("description", { num: orders.length })
            : t("empty"),
      }}
    >
      <AccountCardFooter description={t("more-info")}>
        <Link href="account/keys">
          <Button variant="outline">{t("detail")}</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
