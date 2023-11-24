import * as z from "zod"
import { CompleteProduct, relatedProductSchema } from "./index"

export const featureSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export interface CompleteFeature extends z.infer<typeof featureSchema> {
  products: CompleteProduct[]
}

/**
 * relatedFeatureSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFeatureSchema: z.ZodSchema<CompleteFeature> = z.lazy(() => featureSchema.extend({
  products: relatedProductSchema.array(),
}))
