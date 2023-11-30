import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { productsRouter } from "./products";
import { subscriptionsRouter } from "./subscriptions";
import { usersRouter } from "./users";
import { featuresRouter } from "./features";

export const appRouter = router({
  computers: computersRouter,
  products: productsRouter,
  subscriptions: subscriptionsRouter,
  users: usersRouter,
  features: featuresRouter,
});

export type AppRouter = typeof appRouter;
