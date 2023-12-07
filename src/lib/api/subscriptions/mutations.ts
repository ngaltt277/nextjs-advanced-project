import { db } from "@/lib/db/index";
import {
  NewSubscriptionParams,
  insertSubscriptionSchema,
} from "@/lib/db/schema/subscriptions";

export const createSubscription = async (
  subscription: NewSubscriptionParams
) => {
  const newSubscription = insertSubscriptionSchema.parse({
    ...subscription
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