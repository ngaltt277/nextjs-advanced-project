"use client";
import { CompleteSubscription } from "@/lib/db/schema/subscriptions";
import { trpc } from "@/lib/trpc/client";
import Subscription from "./Subscription";

type Props = {
  subscriptions: CompleteSubscription[];
};

export default function KeyList({ subscriptions }: Props) {
  const { data: p } = trpc.subscriptions.getSubscriptions.useQuery(undefined, {
    initialData: { subscriptions },
    refetchOnMount: false,
  });

  if (p.subscriptions.length === 0) {
    return <EmptyState />;
  }

  return (
    <table className="w-full caption-bottom text-sm">
      <thead className="[&amp;_tr]:border-b">
        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Key
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Customer Name
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Product Name
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Subcribed Date
          </th>
          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
            Expired Date
          </th>
        </tr>
      </thead>
      <tbody className="[&amp;_tr:last-child]:border-0">
        {subscriptions.map((subscription) => (
          <Subscription subscription={subscription} key={subscription.id} />
        ))}
      </tbody>
    </table>
  );
}

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No keys</h3>
    </div>
  );
};
