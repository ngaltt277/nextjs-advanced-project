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
import ProductForm from "./ProductForm";
import { PlusIcon } from "lucide-react";

type Props = {
  product?: any;
  emptyState?: boolean;
};

export default function ProductModal({ product, emptyState }: Props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const editing = !!product?.id;

  const renderButton = () => {
    if (emptyState) {
      return (
        <Button>
          <PlusIcon />
          New Product
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
          <DialogTitle>{editing ? "Edit" : "Create"} Product</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5">
          <ProductForm closeModal={closeModal} product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
