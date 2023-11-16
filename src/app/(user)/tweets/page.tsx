import TweetList from "@/components/tweets/TweetList";
import NewTweetModal from "@/components/tweets/TweetModal";
import { getTweets } from "@/lib/api/tweets/queries";

export default async function Tweets() {
  const { tweets } = await getTweets();

  return (
    <main className="max-w-3xl mx-auto p-5 md:p-0 sm:pt-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-2xl my-2">Tweets</h1>
        <NewTweetModal />
      </div>
      <TweetList tweets={tweets} />
    </main>
  );
}
