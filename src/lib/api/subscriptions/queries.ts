import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import {
  type SubscriptionId,
  subscriptionIdSchema,
} from "@/lib/db/schema/subscriptions";

export const getSubscriptions = async () => {
  const s = await db.subscription.findMany({
    include: { product: true, user: true },
  });
  return { subscriptions: s };
};

export const getSubscriptionsByUserId = async () => {
  const { session } = await getUserAuth();
  const s = await db.subscription.findMany({
    where: { userId: session?.user.id! },
    include: { product: true, user: true },
  });
  return { subscriptions: s };
};

export const getSubscriptionById = async (id: SubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: subscriptionId } = subscriptionIdSchema.parse({ id });
  const s = await db.subscription.findFirst({
    where: { id: subscriptionId, userId: session?.user.id! },
    include: { product: true },
  });
  return { subscriptions: s };
};
