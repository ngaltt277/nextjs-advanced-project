import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getSubscriptionsByCustomerId
} from "@/lib/api/subscriptions/queries";
import { getUserById } from "@/lib/api/users/queries";
import Link from "next/link";
import KeyCard from "./KeyCard";
import { ChevronRightIcon } from "lucide-react";

type Props = {
  params: { id: string };
};

export default async function CustomerDetail({ params }: Props) {
  const { user } = await getUserById(params.id);
  const { subscriptions } = await getSubscriptionsByCustomerId(params.id);

  const renderProfileItem = (label: string, value: any) => {
    return (
      <div className="flex mb-4">
        <p className="w-1/3 text-base font-medium">{label}</p>
        <div className="w-2/3">{value || "none"}</div>
      </div>
    );
  };

  const renderKeys = () => {
    if (subscriptions.length > 0) {
      return subscriptions.map((subscription) => (
        <KeyCard key={subscription.id} subscription={subscription} />
      ));
    }
    return <p className="w-1/3 text-base font-medium">No keys</p>;
  };

  return (
    <main className="flex-grow p-6">
      <div className="flex gap-2 items-center mb-4">
        <Link
          href="/admin/customers"
          className="text-lg font-medium text-stone-500 hover:underline"
        >
          Customers
        </Link>
        <ChevronRightIcon />
        <h1 className="text-lg font-medium flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={user?.imageUrl || ""} alt="@shadcn" />
            <AvatarFallback>
              {user?.firstName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user?.firstName + " " + user?.lastName}
        </h1>
      </div>
      <div className="w-full overflow-auto">
        <h1 className="text-lg font-medium flex gap-4 items-center">Profile</h1>
        <hr className="my-4" />
        <div className="flex">
          <div className="flex-auto">
            {renderProfileItem("First Name", user?.firstName)}
            {renderProfileItem("Last Name", user?.lastName)}
          </div>
          <div className="flex-auto">
            {renderProfileItem("Email Address", user?.email)}
            {renderProfileItem("Phone Number", user?.phoneNumber)}
          </div>
        </div>
        <div className="flex-grow mt-4">
          <div className="mb-4">
            <h1 className="text-lg font-medium">Keys</h1>
            <hr className="my-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-4">
            {renderKeys()}
          </div>
        </div>
      </div>
    </main>
  );
}
