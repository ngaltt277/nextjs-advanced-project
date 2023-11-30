"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Feature } from "@/lib/db/schema/features";
import { CompleteProduct } from "@/lib/db/schema/products";
import { Subscription } from "@/lib/db/schema/subscriptions";
import { trpc } from "@/lib/trpc/client";
import { addYears } from "@/utils/date";
import classNames from "classnames";
import { CheckCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  product: CompleteProduct;
  subscriptions: Subscription[];
};

export default function ProductCard({ product, subscriptions }: Props) {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const router = useRouter();
  const t = useTranslations("Product");

  const subscription = subscriptions.filter(
    (subscription) => subscription.productId === product?.id
  ).at(-1);

  const isSubscribed =
    subscription?.expiredDate &&
    subscription.expiredDate.getTime() > new Date().getTime();

  const onSuccess = async (action: "create" | "delete") => {
    await utils.subscriptions.getSubscriptionsByUserId.invalidate();
    router.refresh();
    toast({
      title: t("success"),
      description: `${
        action === "delete" ? t("unsubscribe") : t("subscribe")
      } ${t("message")}`,
      variant: "default",
    });
  };

  const { mutate: createSubscription, isLoading: isSubscribing } =
    trpc.subscriptions.createSubscription.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: deleteSubscription, isLoading: isUnsubcribing } =
    trpc.subscriptions.deleteSubscription.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const onClick = (productId: string) => {
    if (isSubscribed) {
      deleteSubscription({ id: subscription?.id || "" });
    } else {
      const newScription = {
        productId,
        createdDate: new Date(),
        expiredDate: addYears(new Date(), 1),
      };

      createSubscription(newScription);
    }
  };

  const renderButtonLabel = () => {
    if (isSubscribing) return t("subscribing");
    if (isSubscribed) return t("unsubscribe");
    if (isUnsubcribing) return t("unsubscribing");
    return t("subscribe");
  };

  return (
    <Card
      className={classNames("flex flex-col", {
        "border-green-600": isSubscribed,
        "dark:border-white": isSubscribed,
      })}
    >
      {isSubscribed && (
        <div className="w-full relative">
          <div className="text-center px-3 py-1 bg-green-600 text-white text-xs  w-fit rounded-lg rounded-br-none rounded-tl-none absolute right-0 font-semibold">
            {t("subscribed")}
          </div>
        </div>
      )}
      <CardHeader className="mt-2">
        <CardTitle>
          <Link href={`/${product.id}`}>
            <Button variant="link" className="text-lg p-0">
              {product.name}
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mt-2 mb-8">
          <h3 className="font-bold">
            <span className="text-3xl">${product.price / 100}</span> / 
            {t("year")}
          </h3>
          {product.features.slice(0, 3).map((feature: Feature) => (
            <div className="mt-4 flex gap-2" key={feature.id}>
              <CheckCircleIcon className="text-green-600" />
              <span className="text-base">{feature.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-end justify-center">
        <Button
          className="text-center"
          variant={isSubscribed ? "outline" : "default"}
          disabled={isSubscribing || isUnsubcribing}
          onClick={() => onClick(product.id)}
        >
          {renderButtonLabel()}
        </Button>
      </CardFooter>
    </Card>
  );
}
