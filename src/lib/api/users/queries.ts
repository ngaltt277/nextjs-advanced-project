import { db } from "@/lib/db/index";

export const getUsers = async () => {
  const u = await db.user.findMany();
  return { users: u };
};
