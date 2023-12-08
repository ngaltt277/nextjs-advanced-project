import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db/index";
import { OrderId, orderIdSchema } from "@/lib/db/schema/orders";

export const getOrders = async () => {
  const o = await db.order.findMany({
    include: { subscriptions: true, user: true, Product: true },
  });
  return { orders: o };
};

export const getOrdersByUserId = async () => {
  const { session } = await getUserAuth();
  const o = await db.order.findMany({
    where: { userId: session?.user.id! },
    include: { Product: true, user: true, subscriptions: true },
  });
  return { orders: o };
};

export const getOrdersByCustomerId = async (customerId: string) => {
  const o = await db.order.findMany({
    where: { userId: customerId },
    include: { Product: true, subscriptions: true, user: true },
  });
  return { orders: o };
};

export const getOrderById = async (id: OrderId) => {
  const { session } = await getUserAuth();
  const { id: orderId } = orderIdSchema.parse({ id });
  const s = await db.order.findFirst({
    where: { id: orderId, userId: session?.user.id! },
    include: { Product: true },
  });
  return { subscriptions: s };
};

export const getOrdersByCreatedDate = async () => {
  return await db.order.groupBy({
    by: ["createdDate"],
    _count: {
      createdDate: true,
    },
    orderBy: {
      createdDate: "asc",
    },
    take: 20,
  });
};
