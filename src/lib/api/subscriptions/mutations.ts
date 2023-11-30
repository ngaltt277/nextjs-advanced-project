import { db } from "@/lib/db/index";
import {
  SubscriptionId,
  NewSubscriptionParams,
  UpdateSubscriptionParams,
  updateSubscriptionSchema,
  insertSubscriptionSchema,
  subscriptionIdSchema,
} from "@/lib/db/schema/subscriptions";
import { getUserAuth } from "@/lib/auth/utils";

export const createSubscription = async (
  subscription: NewSubscriptionParams
) => {
  const { session } = await getUserAuth();
  const newSubscription = insertSubscriptionSchema.parse({
    ...subscription,
    userId: session?.user.id!,
  });
  try {
    const s = await db.subscription.create({ data: newSubscription });
    return { subscription: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateSubscription = async (
  id: SubscriptionId,
  subscription: UpdateSubscriptionParams
) => {
  const { session } = await getUserAuth();
  const { id: subscriptionId } = subscriptionIdSchema.parse({ id });
  const newSubscription = updateSubscriptionSchema.parse({
    ...subscription,
    userId: session?.user.id!,
  });
  try {
    const s = await db.subscription.update({
      where: { id: subscriptionId, userId: session?.user.id! },
      data: newSubscription,
    });
    return { subscription: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteSubscription = async (id: SubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: subscriptionId } = subscriptionIdSchema.parse({ id });
  try {
    const s = await db.subscription.delete({
      where: { id: subscriptionId, userId: session?.user.id! },
    });
    return { subscription: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
