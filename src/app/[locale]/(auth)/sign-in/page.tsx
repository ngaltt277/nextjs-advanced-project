import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignIn routing="hash" />
    </main>
  );
}
