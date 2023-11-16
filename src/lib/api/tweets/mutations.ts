import { db } from "@/lib/db/index";
import { 
  TweetId, 
  NewTweetParams,
  UpdateTweetParams, 
  updateTweetSchema,
  insertTweetSchema, 
  tweetIdSchema 
} from "@/lib/db/schema/tweets";
import { getUserAuth } from "@/lib/auth/utils";

export const createTweet = async (tweet: NewTweetParams) => {
  const { session } = await getUserAuth();
  const newTweet = insertTweetSchema.parse({ ...tweet, userId: session?.user.id! });
  try {
    const t = await db.tweet.create({ data: newTweet });
    return { tweet: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateTweet = async (id: TweetId, tweet: UpdateTweetParams) => {
  const { session } = await getUserAuth();
  const { id: tweetId } = tweetIdSchema.parse({ id });
  const newTweet = updateTweetSchema.parse({ ...tweet, userId: session?.user.id! });
  try {
    const t = await db.tweet.update({ where: { id: tweetId, userId: session?.user.id! }, data: newTweet})
    return { tweet: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteTweet = async (id: TweetId) => {
  const { session } = await getUserAuth();
  const { id: tweetId } = tweetIdSchema.parse({ id });
  try {
    const t = await db.tweet.delete({ where: { id: tweetId, userId: session?.user.id! }})
    return { tweet: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

