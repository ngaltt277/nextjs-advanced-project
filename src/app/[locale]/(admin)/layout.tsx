import type { Metadata } from "next";
import Aside from "@/components/Aside";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { UserButton } from "@clerk/nextjs";
import ClientProvider from "i18n/client-provider";
import { LanguageToggle } from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  await checkAuth();
  const { session } = await getUserAuth();
  console.log(session?.user.role);
  
  if (!session || session.user.role !== "admin") return redirect("/");

  return (
    <ClientProvider
      message={["Aside", "Theme", "Locale", "Product", "Customer", "Chart"]}
    >
      <div className="flex">
        <Aside />
        <main className="flex-grow px-3">
          <div className="flex justify-end sticky top-0 py-3 bg-white w-full z-50 dark:bg-black">
            <div className="flex items-center gap-2">
              <ModeToggle />
              <LanguageToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          {children}
        </main>
      </div>
    </ClientProvider>
  );
}
