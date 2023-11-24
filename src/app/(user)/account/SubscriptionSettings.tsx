"use client";
import { AccountCard, AccountCardFooter } from "./AccountCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Subscription } from "@/lib/db/schema/subscriptions";

type Props = {
  subscriptions: Subscription[];
};

export default function SubscriptionSettings({ subscriptions }: Props) {
  return (
    <AccountCard
      params={{
        header: "Your Keys",
        description:
          subscriptions.length > 0
            ? `You are subscribed ${subscriptions.length} keys`
            : "You are not subscribed to any keys",
      }}
    >
      <AccountCardFooter description="Manage your keys.">
        <Link href="account/keys">
          <Button variant="outline">Detail</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
