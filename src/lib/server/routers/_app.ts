import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { productsRouter } from "./products";
import { subscriptionsRouter } from "./subscriptions";
import { usersRouter } from "./users";
import { featuresRouter } from "./features";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  products: productsRouter,
  subscriptions: subscriptionsRouter,
  users: usersRouter,
  features: featuresRouter,
});

export type AppRouter = typeof appRouter;
