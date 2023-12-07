import { db } from "@/lib/db/index";
import { type UserId, userIdSchema } from "@/lib/db/schema/users";

export const getUsers = async () => {
  const u = await db.user.findMany({
    where: { role: "basic_member" },
    include: { orders: true },
  });
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { id: UserId } = userIdSchema.parse({ id });
  const u = await db.user.findFirst({
    where: { id: UserId },
  });
  return { user: u };
};

export const getTopCustomers = async () => {
  return await db.user.findMany({
    where: { role: "basic_member" },
    include: {
      _count: {
        select: { orders: true },
      },
    },
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
    take: 3,
  });
};
