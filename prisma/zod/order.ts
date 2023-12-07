import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteSubscription, relatedSubscriptionSchema, CompleteProduct, relatedProductSchema } from "./index"

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdDate: z.date().nullish(),
  expiredDate: z.date().nullish(),
  productId: z.string(),
})

export interface CompleteOrder extends z.infer<typeof orderSchema> {
  user: CompleteUser
  subscriptions: CompleteSubscription[]
  Product: CompleteProduct
}

/**
 * relatedOrderSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedOrderSchema: z.ZodSchema<CompleteOrder> = z.lazy(() => orderSchema.extend({
  user: relatedUserSchema,
  subscriptions: relatedSubscriptionSchema.array(),
  Product: relatedProductSchema,
}))
