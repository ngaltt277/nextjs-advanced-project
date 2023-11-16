import * as z from "zod"
import { CompleteSubscription, relatedSubscriptionSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof productSchema> {
  subscriptions: CompleteSubscription[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  subscriptions: relatedSubscriptionSchema.array(),
}))
