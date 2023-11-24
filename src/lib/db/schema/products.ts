import { productSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getProducts } from "@/lib/api/products/queries";

// Schema for products - used to validate API requests
export const insertProductSchema = productSchema.omit({
  id: true,
});

export const insertProductParams = productSchema
  .extend({
    price: z.coerce.number(),
  })
  .omit({
    id: true,
  });

export const updateProductSchema = productSchema;

export const updateProductParams = updateProductSchema.extend({
  price: z.coerce.number(),
});

export const productIdSchema = updateProductSchema.pick({ id: true });
export const productNameSchema = updateProductSchema.pick({ name: true });

// Types for products - used to type API request params and within Components
export type Product = z.infer<typeof updateProductSchema>;
export type NewProduct = z.infer<typeof insertProductSchema>;
export type NewProductParams = z.infer<typeof insertProductParams>;
export type UpdateProductParams = z.infer<typeof updateProductParams>;
export type ProductId = z.infer<typeof productIdSchema>["id"];

// this type infers the return from getProducts() - meaning it will include any joins
export type CompleteProduct = Awaited<
  ReturnType<typeof getProducts>
>["products"][number];
