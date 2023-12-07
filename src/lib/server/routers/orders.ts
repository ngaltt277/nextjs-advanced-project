import {
  getOrderById,
  getOrders,
  getOrdersByCustomerId,
  getOrdersByUserId,
} from "@/lib/api/orders/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import { orderIdSchema, insertOrderParams } from "@/lib/db/schema/orders";
import { createOrder } from "@/lib/api/orders/mutations";
import { userIdSchema } from "@/lib/db/schema/users";
import { z } from "zod";

export const ordersRouter = router({
  getOrders: publicProcedure.query(async () => {
    return getOrders();
  }),
  getOrdersByUserId: publicProcedure.query(async () => {
    return getOrdersByUserId();
  }),
  getOrdersByCustomerId: publicProcedure
    .input(userIdSchema)
    .query(async ({ input }) => {
      return getOrdersByCustomerId(input.id);
    }),
  getOrderById: publicProcedure
    .input(orderIdSchema)
    .query(async ({ input }) => {
      return getOrderById(input.id);
    }),
  createOrder: publicProcedure
    .input(z.object({ order: insertOrderParams, numOfKeys: z.number() }))
    .mutation(async ({ input }) => {
      return createOrder(input.order, input.numOfKeys);
    }),
});
