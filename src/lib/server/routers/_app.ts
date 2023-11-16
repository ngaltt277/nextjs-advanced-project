import { computersRouter } from "./computers";
import { router } from "@/lib/server/trpc";
import { accountRouter } from "./account";
import { tweetsRouter } from "./tweets";
import { productsRouter } from "./products";
import { subscriptionsRouter } from "./subscriptions";
import { usersRouter } from "./users";

export const appRouter = router({
  computers: computersRouter,
  account: accountRouter,
  tweets: tweetsRouter,
  products: productsRouter,
  subscriptions: subscriptionsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
