import KeyCard from "@/components/KeyCard";
import { Button } from "@/components/ui/button";
import { getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import Link from "next/link";

export default async function Billing() {
  const { subscriptions } = await getSubscriptionsByUserId();

  const renderKeys = () => {
    if (subscriptions.length > 0) {
      return subscriptions.map((subscription) => (
        <KeyCard key={subscription.id} subscription={subscription} />
      ));
    }
    return <p className="w-1/3 text-base font-medium">No keys</p>;
  };


  return (
    <div className="min-h-[calc(100vh-57px)] ">
      <Link href="/account">
        <Button variant={"link"} className="px-0">
          Back
        </Button>
      </Link>
      <h1 className="text-3xl font-semibold mb-4">Key Details</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4">
        {renderKeys()}
      </div>
    </div>
  );
}
