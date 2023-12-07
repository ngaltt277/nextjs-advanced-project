import { getSubscriptions } from "@/lib/api/subscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import { insertSubscriptionParams } from "@/lib/db/schema/subscriptions";
import { createSubscription } from "@/lib/api/subscriptions/mutations";

export const subscriptionsRouter = router({
  getSubscriptions: publicProcedure.query(async () => {
    return getSubscriptions();
  }),
  createSubscription: publicProcedure
    .input(insertSubscriptionParams)
    .mutation(async ({ input }) => {
      return createSubscription(input);
    }),
});
