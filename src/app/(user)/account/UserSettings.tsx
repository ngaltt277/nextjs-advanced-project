"use client";
import UpdateNameCard from "./UpdateNameCard";
import UpdateEmailCard from "./UpdateEmailCard";
import { AuthSession } from "@/lib/auth/utils";

type Props = {
  session: AuthSession["session"];
};

export default function UserSettings({ session }: Props) {
  return (
    <>
      <UpdateNameCard name={session?.user.name ?? ""} />
      <UpdateEmailCard email={session?.user.email ?? ""} />
    </>
  );
}
