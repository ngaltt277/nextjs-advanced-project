import * as z from "zod"
import { CompleteSubscription, relatedSubscriptionSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  Subscription: CompleteSubscription[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  Subscription: relatedSubscriptionSchema.array(),
}))
