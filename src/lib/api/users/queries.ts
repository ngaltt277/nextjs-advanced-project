import { db } from "@/lib/db/index";
import { type UserId, userIdSchema } from "@/lib/db/schema/users";

export const getUsers = async () => {
  const u = await db.user.findMany({
    where: { role: "basic_member" },
    include: { Subscription: true },
  });
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { id: UserId } = userIdSchema.parse({ id });
  return await db.user.findFirst({
    where: { id: UserId },
  });
};
