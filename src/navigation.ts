import { locales } from "i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: {},
  });
