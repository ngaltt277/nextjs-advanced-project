import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignUp routing="hash" />
    </main>
  );
}
