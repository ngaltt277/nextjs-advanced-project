"use client";
import { AccountCard, AccountCardFooter } from "./AccountCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Subscription } from "@/lib/db/schema/subscriptions";
import { useTranslations } from "next-intl";

type Props = {
  subscriptions: Subscription[];
};

export default function SubscriptionSettings({ subscriptions }: Props) {
  const t = useTranslations("Account.keys");

  return (
    <AccountCard
      params={{
        header: t("title"),
        description:
          subscriptions.length > 0
            ? t("description", { num: subscriptions.length })
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
