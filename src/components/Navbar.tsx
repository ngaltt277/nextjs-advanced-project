import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "./ui/button";

export default async function Navbar() {
  return (
    <nav className="py-2 flex items-center justify-between transition-all duration-300">
      <h1 className="font-semibold hover:opacity-75 transition-hover cursor-pointer">
        <Link href="/">Logo</Link>
      </h1>
      <div className="space-x-2 flex items-center">
        <Link href="/account">
          <Button variant="ghost">Account and Billing</Button>
        </Link>
        <SignedIn>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <button className="text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4">
              Login
            </button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
