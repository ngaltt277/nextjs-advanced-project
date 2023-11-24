"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FeatureForm from "./FeatureForm";

type Props = {
  feature?: any;
  emptyState?: boolean;
  toggleProductModal?: (value: boolean) => void;
};

export default function FeatureModal({
  feature,
  emptyState,
  toggleProductModal,
}: Props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!feature?.id;

  const renderButton = () => {
    if (emptyState) {
      return (
        <Button>
          <PlusIcon />
          New Feature
        </Button>
      );
    }
    return (
      <Button
        variant={editing ? "ghost" : "outline"}
        size={editing ? "sm" : "icon"}
      >
        {editing ? "Edit" : "+"}
      </Button>
    );
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{renderButton()}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{editing ? "Edit" : "Create"} Feature</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <FeatureForm
            closeModal={closeModal}
            feature={feature}
            toggleProductModal={toggleProductModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
