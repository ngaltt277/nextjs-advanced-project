"use client";

import {
  Tweet,
  NewTweetParams,
  insertTweetParams,
} from "@/lib/db/schema/tweets";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  tweet?: Tweet;
  closeModal: () => void;
};

const TweetForm = ({ tweet, closeModal }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

  const editing = !!tweet?.id;

  const form = useForm<z.infer<typeof insertTweetParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertTweetParams),
    defaultValues: tweet ?? {
      content: "",
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.tweets.getTweets.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Tweet ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createTweet, isLoading: isCreating } =
    trpc.tweets.createTweet.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateTweet, isLoading: isUpdating } =
    trpc.tweets.updateTweet.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteTweet, isLoading: isDeleting } =
    trpc.tweets.deleteTweet.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewTweetParams) => {
    if (editing) {
      updateTweet({ ...values, id: tweet.id });
    } else {
      createTweet(values);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteTweet({ id: tweet.id })}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default TweetForm;
