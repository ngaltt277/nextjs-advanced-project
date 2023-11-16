"use client";
import { AccountCard, AccountCardBody, AccountCardFooter } from "./AccountCard";
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
            ? `You are subscribed ${subscriptions.length} products`
            : "You are not subscribed to any products",
      }}
    >
      {subscriptions.length > 0 &&
        subscriptions.map((subscription) => (
          <AccountCardBody key={subscription.id}>
            <p className="text-lg font-semibold leading-none my-2">
              {subscription.id}
            </p>
            <p className="text-sm text-muted-foreground">
              Your key will be canceled on
              {` ${subscription.expiredDate?.toLocaleDateString("en-us")}`}
            </p>
          </AccountCardBody>
        ))}
      <AccountCardFooter description="Manage your keys.">
        <Link href="/account/keys">
          <Button variant="outline">Detail</Button>
        </Link>
      </AccountCardFooter>
    </AccountCard>
  );
}
