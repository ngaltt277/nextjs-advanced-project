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
          role: (sessionClaims?.organizations as any)[
            `${process.env.CLERK_ORGANIZATION_ID}`
          ],
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

  if (!user && sessionClaims) {
    const session: any = sessionClaims;
    const orgId = process.env.CLERK_ORGANIZATION_ID ?? "";
    const newUser: NewUserParams = {
      id: userId,
      firstName: `${session.firstName}`,
      lastName: `${session.lastName}`,
      email: `${session.email}`,
      imageUrl: `${session.image}`,
      phoneNumber: `${session.phoneNumber}`,
      role: session.organizations[orgId] ?? "basic_member",
    };
    await createUser(newUser);
  }
};
