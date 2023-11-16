"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TweetForm from "./TweetForm";
import { Tweet } from "@/lib/db/schema/tweets";
import { trpc } from "@/lib/trpc/client";

export default function TweetModal({
  tweet,
  emptyState,
}: {
  tweet?: Tweet;
  emptyState?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!tweet?.id;
  const { data: sub } = trpc.account.getSubscription.useQuery();
  const canPost = sub?.isSubscribed ?? true;

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        {emptyState ? (
          <Button disabled={canPost === false}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            New Tweet
          </Button>
        ) : (
          <Button
            variant={editing ? "ghost" : "outline"}
            size={editing ? "sm" : "icon"}
            // disabled={canPost === false}
          >
            {editing ? "Edit" : "+"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{editing ? "Edit" : "Create"} Tweet</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <TweetForm closeModal={closeModal} tweet={tweet} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
