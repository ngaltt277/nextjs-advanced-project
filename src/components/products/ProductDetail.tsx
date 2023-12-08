"use client";

import { CompleteProduct } from "@/lib/db/schema/products";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { addYears, formatDate } from "@/utils/date";
import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { NewOrderParams } from "@/lib/db/schema/orders";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  product: CompleteProduct | null;
};

export default function ProductDetail({ product }: Props) {
  const [numOfKeys, setNumOfKeys] = useState(1);
  const utils = trpc.useContext();
  const router = useRouter();
  const t = useTranslations("Product");

  const onMinusClick = () => {
    if (numOfKeys > 0) {
      setNumOfKeys((pre) => {
        return pre - 1;
      });
    }
  };

  const onPlusClick = () => {
    setNumOfKeys((pre) => {
      return pre + 1;
    });
  };

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.products.getProducts.invalidate();
    router.push("/");
    toast({
      title: t("success"),
      description: `Order is ${action}d`,
      variant: "default",
    });
  };

  const { mutate: createOrder, isLoading: isCreating } =
    trpc.orders.createOrder.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const onClickOrder = () => {
    const newOrder: NewOrderParams = {
      productId: product!.id,
      createdDate: new Date(),
      expiredDate: addYears(new Date(), 1),
    };

    createOrder({ order: newOrder, numOfKeys });
  };

  return (
    <main className="flex-grow px-6 mb-6">
      <div className="flex gap-2 items-center mb-4">
        <Link
          href="/admin/products"
          className="text-sm font-medium text-stone-500 hover:underline"
        >
          {t("title")}
        </Link>
        <ChevronRightIcon />
        <h1 className="text-sm font-medium flex gap-4 items-center">
          {product?.name}
        </h1>
      </div>
      <div className="w-full mt-5 flex gap-10 justify-between">
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="text-2xl font-semibold">{product?.name}</h2>
          <div className="text-gray-500">{product?.description}</div>
          <div className="text-green-600 text-base font-semibold">
            ${product?.price} / year
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
            {product?.features.map((feature) => (
              <div className="mt-4 flex gap-2" key={feature.id}>
                <CheckCircleIcon className="text-green-600" />
                <span className="text-base">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="flex flex-col gap-4 p-5">
          <div className="flex items-center gap-8"> 
            <div>Num of keys</div>
            <div className="flex">
              <Button
                className="rounded-none p-2"
                onClick={onMinusClick}
                disabled={numOfKeys <= 1}
              >
                <MinusIcon className="w-4 h-4" />
              </Button>
              <Input
                className="w-10 rounded-none focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                maxLength={2}
                value={numOfKeys}
                onChange={(e: any) => setNumOfKeys(Number(e.target.value))}
              />
              <Button className="rounded-none p-2" onClick={onPlusClick}>
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-8 justify-between">
            <p>Expired Date:</p>
            <span>{formatDate(addYears(new Date(), 1))}</span>
          </div>
          <hr />
          <div className="flex items-center gap-8 justify-between">
            <p className="text-lg font-medium text-green-700">Total:</p>
            <p className="text-lg font-medium text-green-700">
              ${product!.price * numOfKeys}
            </p>
          </div>
          <Button
            className="mt-5 text-white"
            onClick={onClickOrder}
            disabled={isCreating}
          >
            {isCreating ? "Ordering" : "Order"}
          </Button>
        </Card>
      </div>
    </main>
  );
}
