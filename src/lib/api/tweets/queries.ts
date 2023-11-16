import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type TweetId, tweetIdSchema } from "@/lib/db/schema/tweets";

export const getTweets = async () => {
  const { session } = await getUserAuth();
  const t = await db.tweet.findMany({ where: {userId: session?.user.id!}, orderBy: {"createdAt": "desc"}});
  return { tweets: t };
};

export const getTweetById = async (id: TweetId) => {
  const { session } = await getUserAuth();
  const { id: tweetId } = tweetIdSchema.parse({ id });
  const t = await db.tweet.findFirst({
    where: { id: tweetId, userId: session?.user.id!}});
  return { tweets: t };
};

