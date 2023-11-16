import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  ignoredRoutes: "/api/webhooks/stripe",
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    const { userId, sessionClaims } = auth;

    if (
      userId &&
      (sessionClaims.role as any)["org_2Y9BAH4UE5M6DCOmO2LMagzI6Oh"] ===
        "admin" &&
      req.nextUrl.pathname === "/"
    ) {
      const orgSelection = new URL("/admin", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
