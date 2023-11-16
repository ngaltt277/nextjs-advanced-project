import * as z from "zod"
import { CompleteProduct, relatedProductSchema, CompleteUser, relatedUserSchema } from "./index"

export const subscriptionSchema = z.object({
  id: z.string(),
  productId: z.string(),
  createdDate: z.date().nullish(),
  expiredDate: z.date().nullish(),
  userId: z.string(),
})

export interface CompleteSubscription extends z.infer<typeof subscriptionSchema> {
  product: CompleteProduct
  user: CompleteUser
}

/**
 * relatedSubscriptionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSubscriptionSchema: z.ZodSchema<CompleteSubscription> = z.lazy(() => subscriptionSchema.extend({
  product: relatedProductSchema,
  user: relatedUserSchema,
}))
