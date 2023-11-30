"use client";

import * as React from "react";
import { LanguagesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

export function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Locale");
  const locale = useLocale();

  const onChange = (locale: string) => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <LanguagesIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">{t("label")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={onChange}>
          <DropdownMenuRadioItem value="en">
            {t("locale", { locale: "en" })}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vi">
            {t("locale", { locale: "vi" })}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
