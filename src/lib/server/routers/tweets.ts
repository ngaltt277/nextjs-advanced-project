import { getTweetById, getTweets } from "@/lib/api/tweets/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  tweetIdSchema,
  insertTweetParams,
  updateTweetParams,
} from "@/lib/db/schema/tweets";
import { createTweet, deleteTweet, updateTweet } from "@/lib/api/tweets/mutations";

export const tweetsRouter = router({
  getTweets: publicProcedure.query(async () => {
    return getTweets();
  }),
  getTweetById: publicProcedure.input(tweetIdSchema).query(async ({ input }) => {
    return getTweetById(input.id);
  }),
  createTweet: publicProcedure
    .input(insertTweetParams)
    .mutation(async ({ input }) => {
      return createTweet(input);
    }),
  updateTweet: publicProcedure
    .input(updateTweetParams)
    .mutation(async ({ input }) => {
      return updateTweet(input.id, input);
    }),
  deleteTweet: publicProcedure
    .input(tweetIdSchema)
    .mutation(async ({ input }) => {
      return deleteTweet(input.id);
    }),
});
