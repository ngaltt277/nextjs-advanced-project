import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { locales } from "i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: "en",
  localePrefix: "never",
});

export default authMiddleware({
  ignoredRoutes: "/api/webhooks/stripe",
  publicRoutes: ["/"],
  beforeAuth(req) {
    if (
      req.nextUrl.pathname.startsWith("/_next") ||
      req.nextUrl.pathname.includes("/api/")
    ) {
      return;
    }
    return intlMiddleware(req);
  },
  async afterAuth(auth, req) {
    const { userId, sessionClaims } = auth;
    const session: any = sessionClaims;
    const orgId = process.env.CLERK_ORGANIZATION_ID ?? "";
    if (
      userId &&
      session.organizations[orgId] === "admin" &&
      req.nextUrl.pathname === "/"
    ) {
      const adminPath = new URL("/admin", req.url);
      return NextResponse.redirect(adminPath);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
