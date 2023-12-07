import { db } from "@/lib/db/index";

export const getSubscriptions = async () => {
  const s = await db.subscription.findMany({
    include: { Order: true },
  });
  return { subscriptions: s };
};
