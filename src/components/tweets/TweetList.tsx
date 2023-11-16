"use client";
import { CompleteTweet } from "@/lib/db/schema/tweets";
import { trpc } from "@/lib/trpc/client";
import TweetModal from "./TweetModal";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function TweetList({ tweets }: { tweets: CompleteTweet[] }) {
  const { data: t } = trpc.tweets.getTweets.useQuery(undefined, {
    initialData: { tweets },
    refetchOnMount: false,
  });

  if (t.tweets.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {t.tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet.id} />
      ))}
    </ul>
  );
}

const Tweet = ({ tweet }: { tweet: CompleteTweet }) => {
  const { data: session } = trpc.account.getUser.useQuery();

  return (
    <li className="flex justify-between my-2">
      <div className="p-4 border border-zinc-200 rounded-lg dark:border-zinc-800 w-full">
        <div className="flex items-start space-x-4">
          <Avatar>
            <AvatarImage alt="@username" src="/placeholder-avatar.png" />
            <AvatarFallback>{session?.user.name ? session.user.name[0] : "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="font-medium">{session?.user.name}</h2>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                . {tweet.createdAt?.toLocaleTimeString("en-us")}
              </span>
            </div>
            <p className="mt-2">{tweet.content}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No tweets</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new tweet.
      </p>
      <div className="mt-6">
        <TweetModal emptyState={true} />
      </div>
    </div>
  );
};
