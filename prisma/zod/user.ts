import * as z from "zod"
import { CompleteOrder, relatedOrderSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(),
  imageUrl: z.string().nullish(),
  email: z.string(),
  phoneNumber: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  orders: CompleteOrder[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  orders: relatedOrderSchema.array(),
}))
