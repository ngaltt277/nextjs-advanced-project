import { subscriptionSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getSubscriptions } from "@/lib/api/subscriptions/queries";


// Schema for subscriptions - used to validate API requests
export const insertSubscriptionSchema = subscriptionSchema.omit({ id: true });

export const insertSubscriptionParams = subscriptionSchema.extend({
  productId: z.coerce.string(),
  createdDate: z.coerce.date(),
  expiredDate: z.coerce.date()
}).omit({ 
  id: true,
});

export const updateSubscriptionSchema = subscriptionSchema;

export const updateSubscriptionParams = updateSubscriptionSchema.extend({
  productId: z.coerce.string(),
  createdDate: z.coerce.date(),
  expiredDate: z.coerce.date()
});

export const subscriptionIdSchema = updateSubscriptionSchema.pick({ id: true });

// Types for subscriptions - used to type API request params and within Components
export type Subscription = z.infer<typeof updateSubscriptionSchema>;
export type NewSubscription = z.infer<typeof insertSubscriptionSchema>;
export type NewSubscriptionParams = z.infer<typeof insertSubscriptionParams>;
export type UpdateSubscriptionParams = z.infer<typeof updateSubscriptionParams>;
export type SubscriptionId = z.infer<typeof subscriptionIdSchema>["id"];
    
// this type infers the return from getSubscriptions() - meaning it will include any joins
export type CompleteSubscription = Awaited<ReturnType<typeof getSubscriptions>>["subscriptions"][number];

