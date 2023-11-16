import { tweetSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";
import { getTweets } from "@/lib/api/tweets/queries";


// Schema for tweets - used to validate API requests
export const insertTweetSchema = tweetSchema.omit({ id: true });

export const insertTweetParams = tweetSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateTweetSchema = tweetSchema;

export const updateTweetParams = updateTweetSchema.extend({}).omit({ 
  userId: true
});

export const tweetIdSchema = updateTweetSchema.pick({ id: true });

// Types for tweets - used to type API request params and within Components
export type Tweet = z.infer<typeof updateTweetSchema>;
export type NewTweet = z.infer<typeof insertTweetSchema>;
export type NewTweetParams = z.infer<typeof insertTweetParams>;
export type UpdateTweetParams = z.infer<typeof updateTweetParams>;
export type TweetId = z.infer<typeof tweetIdSchema>["id"];
    
// this type infers the return from getTweets() - meaning it will include any joins
export type CompleteTweet = Awaited<ReturnType<typeof getTweets>>["tweets"][number];

