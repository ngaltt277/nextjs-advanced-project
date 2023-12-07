import * as z from "zod"
import { CompleteOrder, relatedOrderSchema } from "./index"

export const subscriptionSchema = z.object({
  id: z.string(),
  orderId: z.string().nullish(),
})

export interface CompleteSubscription extends z.infer<typeof subscriptionSchema> {
  Order?: CompleteOrder | null
}

/**
 * relatedSubscriptionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSubscriptionSchema: z.ZodSchema<CompleteSubscription> = z.lazy(() => subscriptionSchema.extend({
  Order: relatedOrderSchema.nullish(),
}))
