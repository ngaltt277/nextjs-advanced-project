"use client";

import { useTranslations } from "next-intl";

type Props = {
  message: string;
  value: string;
};

export default function TranslateHeader({ message, value }: Props) {
  const t = useTranslations(message);

  return t(value);
}
