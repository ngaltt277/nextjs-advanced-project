import { db } from "@/lib/db/index";
import {
  UserId,
  NewUserParams,
  UpdateUserParams,
  updateUserSchema,
  insertUserSchema,
  userIdSchema,
} from "@/lib/db/schema/users";

export const createUser = async (User: NewUserParams) => {
  const newUser = insertUserSchema.parse({
    ...User,
  });
  try {
    const t = await db.user.create({ data: newUser });
    return { User: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateUser = async (id: UserId, User: UpdateUserParams) => {
  const { id: UserId } = userIdSchema.parse({ id });
  const newUser = updateUserSchema.parse({
    ...User,
  });
  try {
    const t = await db.user.update({
      where: { id: UserId },
      data: newUser,
    });
    return { User: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteUser = async (id: UserId) => {
  const { id: UserId } = userIdSchema.parse({ id });
  try {
    const t = await db.user.delete({
      where: { id: UserId },
    });
    return { User: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
