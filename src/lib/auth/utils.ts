import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "../api/users/queries";
import { createUser } from "../api/users/mutations";
import { NewUserParams } from "../db/schema/users";

export type AuthSession = {
  session: {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
    };
  } | null;
};

export const getUserAuth = async () => {
  const { userId, sessionClaims } = auth();

  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          name: `${sessionClaims?.firstName} ${sessionClaims?.lastName}`,
          email: sessionClaims?.email,
          role: sessionClaims?.role as any,
          image: sessionClaims?.image,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth: any = async () => {
  const { userId, sessionClaims } = auth();

  if (!userId) redirect("/sign-in");

  const { user } = await getUserById(userId);
  if (!user) {
    const newUser: NewUserParams = {
      id: userId,
      firstName: `${sessionClaims?.firstName}`,
      lastName: `${sessionClaims?.lastName}`,
      email: `${sessionClaims?.email}`,
      imageUrl: `${sessionClaims.image}`,
      phoneNumber: `${sessionClaims?.phoneNumber}`,
      role: "basic_member",
    };
    await createUser(newUser);
  }
};
