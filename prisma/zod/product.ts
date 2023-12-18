import * as z from "zod"
import { CompleteFeature, relatedFeatureSchema, CompleteOrder, relatedOrderSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().int(),
})

export interface CompleteProduct extends z.infer<typeof productSchema> {
  features: CompleteFeature[]
  orders: CompleteOrder[]
}

/**
 * relatedProductSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedProductSchema: z.ZodSchema<CompleteProduct> = z.lazy(() => productSchema.extend({
  features: relatedFeatureSchema.array(),
  orders: relatedOrderSchema.array(),
}))
