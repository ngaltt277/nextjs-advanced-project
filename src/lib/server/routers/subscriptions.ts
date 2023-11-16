import { getSubscriptionById, getSubscriptions, getSubscriptionsByUserId } from "@/lib/api/subscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subscriptionIdSchema,
  insertSubscriptionParams,
  updateSubscriptionParams,
} from "@/lib/db/schema/subscriptions";
import { createSubscription, deleteSubscription, updateSubscription } from "@/lib/api/subscriptions/mutations";

export const subscriptionsRouter = router({
  getSubscriptions: publicProcedure.query(async () => {
    return getSubscriptions();
  }),
  getSubscriptionsByUserId: publicProcedure.query(async () => {
    return getSubscriptionsByUserId();
  }),
  getSubscriptionById: publicProcedure
    .input(subscriptionIdSchema)
    .query(async ({ input }) => {
      return getSubscriptionById(input.id);
    }),
  createSubscription: publicProcedure
    .input(insertSubscriptionParams)
    .mutation(async ({ input }) => {
      return createSubscription(input);
    }),
  updateSubscription: publicProcedure
    .input(updateSubscriptionParams)
    .mutation(async ({ input }) => {
      return updateSubscription(input.id, input);
    }),
  deleteSubscription: publicProcedure
    .input(subscriptionIdSchema)
    .mutation(async ({ input }) => {
      return deleteSubscription(input.id);
    }),
});
