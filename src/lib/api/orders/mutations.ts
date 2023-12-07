import { getUserAuth } from "@/lib/auth/utils";
import { NewOrderParams, insertOrderSchema } from "@/lib/db/schema/orders";
import { db } from "@/lib/db/index";

export const createOrder = async (order: NewOrderParams, numOfKeys: number) => {
  const { session } = await getUserAuth();
  const subscriptions = [];
  for (let i = 0; i < numOfKeys; i++) {
    subscriptions.push({});
  }
  const newOrder = insertOrderSchema.parse({
    ...order,
    userId: session?.user.id!,
  });
  try {
    const s = await db.order.create({
      data: { ...newOrder, subscriptions: { create: subscriptions } },
    });
    return { order: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
