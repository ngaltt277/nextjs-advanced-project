import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUser } from "../api/users/mutations";
import { getUserById } from "../api/users/queries";

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
  // find out more about setting up 'sessionClaims' (custom sessions) here: https://clerk.com/docs/backend-requests/making/custom-session-token
  const { userId, sessionClaims } = auth();

  if (userId) {
    return {
      session: {
        user: {
          id: userId,
          name: `${sessionClaims?.firstName} ${sessionClaims?.lastName}`,
          email: sessionClaims?.email,
          role: (sessionClaims?.role as any).org_2Y9BAH4UE5M6DCOmO2LMagzI6Oh,
          image: sessionClaims?.image,
        },
      },
    } as AuthSession;
  } else {
    return { session: null };
  }
};

export const checkAuth: any = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
};
