import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/date";
import { CaretRightIcon } from "@radix-ui/react-icons";

type Props = {
  subscription: any;
};

export default function KeyCard({ subscription }: Props) {
  const { id, expiredDate, product } = subscription;

  const isExpired =
    expiredDate?.getTime() && expiredDate?.getTime() < new Date().getTime();

  const renderStatus = () => {
    if (isExpired) {
      return (
        <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
          Expired
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-green-200 text-green-800 rounded-md">
        Using
      </span>
    );
  };

  const renderCardDescription = () => {
    if (isExpired) {
      return `Your key was expired in ${formatDate(expiredDate)}`;
    }
    return `Your key will be expired in ${formatDate(expiredDate)}`;
  };

  return (
    <Card className={isExpired ? "border-red-800" : "border-green-800"}>
      <CardHeader>
        <CardTitle className="text-lg">{id}</CardTitle>
        <CardDescription>{renderCardDescription()}</CardDescription>
        <CardContent className="m-0 p-0">
          <p className="flex gap-4 items-center">
            <CaretRightIcon />
            <div className="flex w-full text-sm gap-2">
              <p className="w-1/3">Product Name:</p>
              <strong>{product.name}</strong>
            </div>
          </p>
          <p className="flex gap-4 items-center">
            <CaretRightIcon />
            <div className="flex w-full text-sm gap-2">
              <p className="w-1/3">Descripion:</p>
              <strong>{product.description}</strong>
            </div>
          </p>
          <p className="flex gap-4 items-center">
            <CaretRightIcon />
            <div className="flex w-full text-sm gap-2">
              <p className="w-1/3">Price:</p>
              <strong>${product.price / 100} / year</strong>
            </div>
          </p>
        </CardContent>
        <CardFooter className="m-0 p-0 w-full flex justify-end">
          {renderStatus()}
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
