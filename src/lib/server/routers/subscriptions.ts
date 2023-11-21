import {
  getSubscriptionById,
  getSubscriptions,
  getSubscriptionsByCustomerId,
  getSubscriptionsByUserId,
} from "@/lib/api/subscriptions/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  subscriptionIdSchema,
  insertSubscriptionParams,
  updateSubscriptionParams,
} from "@/lib/db/schema/subscriptions";
import {
  createSubscription,
  deleteSubscription,
  updateSubscription,
} from "@/lib/api/subscriptions/mutations";
import { userIdSchema } from "@/lib/db/schema/users";

export const subscriptionsRouter = router({
  getSubscriptions: publicProcedure.query(async () => {
    return getSubscriptions();
  }),
  getSubscriptionsByUserId: publicProcedure.query(async () => {
    return getSubscriptionsByUserId();
  }),
  getSubscriptionsByCustomerId: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      return getSubscriptionsByCustomerId(input.id);
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
