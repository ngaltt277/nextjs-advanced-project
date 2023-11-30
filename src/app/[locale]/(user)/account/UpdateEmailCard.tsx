import { AccountCard, AccountCardFooter, AccountCardBody } from "./AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = { email: string };

export default function UpdateEmailCard({ email }: Props) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useTranslations("Account.email");

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const { email } = Object.fromEntries(form.entries()) as { email: string };
    if (email.length < 3) {
      toast({
        description: t("error"),
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/account", {
        method: "PUT",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 200) toast({ description: t("success") });
      router.refresh();
    });
  };

  return (
    <AccountCard
      params={{
        header: t("title"),
        description: t("description"),
      }}
    >
      <form onSubmit={handleSubmit}>
        <AccountCardBody>
          <Input defaultValue={email ?? ""} name="email" disabled />
        </AccountCardBody>
        <AccountCardFooter description={t("more-info")}>
          <Button disabled>{t("update")}</Button>
        </AccountCardFooter>
      </form>
    </AccountCard>
  );
}
