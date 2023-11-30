import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "vi"];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./${locale}.json`)).default,
}));
