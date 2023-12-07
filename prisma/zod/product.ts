import * as z from "zod"
import { CompleteFeature, relatedFeatureSchema, CompleteOrder, relatedOrderSchema } from "./index"

export const productSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: "Name is required" }),
  description: z
    .string({ required_error: "Name is required" })
    .min(5, "Description is greater than 5 characters"),
  price: z.number().int().positive(),
  features: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .refine((value) => value.some((feature) => feature), {
      message: "You have to select at least one item.",
    }),
});

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
