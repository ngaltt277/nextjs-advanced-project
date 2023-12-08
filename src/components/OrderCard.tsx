import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompleteOrder } from "@/lib/db/schema/orders";
import { formatDate } from "@/utils/date";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

type Props = {
  order: CompleteOrder;
};

export default function OrderCard({ order }: Props) {
  const {
    id,
    expiredDate,
    Product: product,
    createdDate,
    subscriptions,
  } = order;
  const tKey = useTranslations("Key");
  const tProduct = useTranslations("Product");

  const isExpired =
    expiredDate?.getTime() && expiredDate?.getTime() < new Date().getTime();

  const renderStatus = () => {
    if (isExpired) {
      return (
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
          {tKey("expired")}
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-200 text-green-800 rounded-md">
        {tKey("using")}
      </span>
    );
  };

  const renderCardDescription = () => {
    if (isExpired) {
      return `${tKey("expired-desc")} ${formatDate(expiredDate)}`;
    }
    return `${tKey("using-desc")} ${formatDate(expiredDate)}`;
  };

  return (
    <Card className={isExpired ? "border-red-800" : "border-green-800"}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Order - {id}</CardTitle>
        <CardDescription>Date: {formatDate(createdDate)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8">
          <div className="flex-auto">
            <div className="mb-3">Product:</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <CaretRightIcon />
                <div className="flex w-full text-sm gap-2">
                  <div className="w-1/3">{tProduct("name")}:</div>
                  <strong>{product.name}</strong>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <CaretRightIcon />
                <div className="flex w-full text-sm gap-2">
                  <div className="w-1/3">{tProduct("description")}:</div>
                  <strong>{product.description}</strong>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <CaretRightIcon />
                <div className="flex w-full text-sm gap-2">
                  <div className="w-1/3">{tProduct("price")}:</div>
                  <strong>
                    ${product.price / 100} / {tProduct("year")}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto">
            <div className="mb-3">Keys:</div>
            <div className="flex flex-col gap-1">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="flex gap-4 items-center">
                  <CaretRightIcon />
                  <div className="flex w-full text-sm gap-2">
                    <strong>{subscription.id}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full flex justify-between">
        <CardDescription>{renderCardDescription()}</CardDescription>
        {renderStatus()}
      </CardFooter>
    </Card>
  );
}
