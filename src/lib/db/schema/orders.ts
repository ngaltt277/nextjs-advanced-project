import { orderSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getOrders } from "@/lib/api/orders/queries";

// Schema for orders - used to validate API requests
export const insertOrderSchema = orderSchema.omit({ id: true });

export const insertOrderParams = orderSchema
  .extend({
    productId: z.coerce.string(),
    createdDate: z.coerce.date(),
    expiredDate: z.coerce.date(),
  })
  .omit({
    id: true,
    userId: true,
  });

export const updateOrderSchema = orderSchema;

export const updateOrderParams = updateOrderSchema
  .extend({
    productId: z.coerce.string(),
    createdDate: z.coerce.date(),
    expiredDate: z.coerce.date(),
  })
  .omit({
    userId: true,
  });

export const orderIdSchema = updateOrderSchema.pick({ id: true });

// Types for orders - used to type API request params and within Components
export type Order = z.infer<typeof updateOrderSchema>;
export type NewOrder = z.infer<typeof insertOrderSchema>;
export type NewOrderParams = z.infer<typeof insertOrderParams>;
export type UpdateOrderParams = z.infer<typeof updateOrderParams>;
export type OrderId = z.infer<typeof orderIdSchema>["id"];

// this type infers the return from getOrders() - meaning it will include any joins
export type CompleteOrder = Awaited<
  ReturnType<typeof getOrders>
>["orders"][number];
