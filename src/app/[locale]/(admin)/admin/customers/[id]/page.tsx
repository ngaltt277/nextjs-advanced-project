import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserById } from "@/lib/api/users/queries";
import Link from "next/link";
import OrderCard from "@/components/OrderCard";
import { ChevronRightIcon } from "lucide-react";
import { getOrdersByCustomerId } from "@/lib/api/orders/queries";

type Props = {
  params: { id: string };
};

export default async function CustomerDetail({ params }: Props) {
  const { user } = await getUserById(params.id);
  const { orders } = await getOrdersByCustomerId(params.id);

  const renderProfileItem = (label: string, value: any) => {
    return (
      <div className="flex mb-4">
        <p className="w-1/3 text-sm font-medium">{label}</p>
        <div className="w-2/3">{value || "none"}</div>
      </div>
    );
  };

  const renderOrders = () => {
    if (orders.length > 0) {
      return orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ));
    }
    return <p className="w-1/3 text-base font-medium">No orders</p>;
  };

  return (
    <main className="flex-grow px-6 mb-6">
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
            <h1 className="text-lg font-medium">Orders</h1>
            <hr className="my-4" />
          </div>
          <div className="w-full">
            {renderOrders()}
          </div>
        </div>
      </div>
    </main>
  );
}
