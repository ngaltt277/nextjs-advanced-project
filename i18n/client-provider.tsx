import pick from "lodash/pick";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { Many } from "lodash";

type Props = {
  children: ReactNode;
};

export default async function ClientProvider({ children }: Props) {
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
