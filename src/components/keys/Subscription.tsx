import { CompleteSubscription } from "@/lib/db/schema/subscriptions";

type Props = { subscription: CompleteSubscription };

export default function Subscription({ subscription }: Props) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {subscription.id}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {subscription.user.firstName + " " + subscription.user.lastName}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {subscription.product.name}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {` ${subscription.createdDate?.toLocaleDateString("en-us")}`}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {` ${subscription.expiredDate?.toLocaleDateString("en-us")}`}
      </td>
    </tr>
  );
}
