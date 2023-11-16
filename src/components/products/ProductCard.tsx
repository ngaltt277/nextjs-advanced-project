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
import { Subscription } from "@/lib/db/schema/subscriptions";
import { trpc } from "@/lib/trpc/client";
import addYears from "@/utils/dateUtils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

type Props = {
  product: Product;
  subscriptions: Subscription[];
};

export default function ProductCard({ product, subscriptions }: Props) {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const router = useRouter();

  const isSubscribed = subscriptions?.some(
    (subscription) => subscription.productId === product?.id
  );

  const onSuccess = async (action: "create" | "delete") => {
    await utils.subscriptions.getSubscriptionsByUserId.invalidate();
    router.refresh();
    toast({
      title: "Success",
      description: `${
        action === "delete" ? "Unsubscribe" : "Subcribe"
      } product successfully!`,
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
      const subscription = subscriptions.find(
        (subscription) => subscription.productId === productId
      );
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
    if (isSubscribing) return "Subscribing";
    if (isSubscribed) return "Unsubscribe";
    if (isUnsubcribing) return "Unsubscribing";
    return "Subscribe";
  };

  return (
    <Card className={isSubscribed ? "border-primary" : ""}>
      {isSubscribed && (
        <div className="w-full relative">
          <div className="text-center px-3 py-1 bg-secondary-foreground text-secondary text-xs  w-fit rounded-l-lg rounded-t-none absolute right-0 font-semibold">
            Subscribed
          </div>
        </div>
      )}
      <CardHeader className="mt-2">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 mb-8">
          <h3 className="font-bold">
            <span className="text-3xl">${product.price / 100}</span> / year
          </h3>
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
