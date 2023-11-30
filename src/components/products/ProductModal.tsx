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
import { trpc } from "@/lib/trpc/client";
import { Feature } from "@/lib/db/schema/features";
import FeatureModal from "../features/FeatureModal";
import { useTranslations } from "next-intl";

type Props = {
  product?: any;
  emptyState?: boolean;
};

export default function ProductModal({ product, emptyState }: Props) {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState([] as Feature[]);
  const closeModal = () => setOpen(false);
  const editing = !!product?.id;
  const utils = trpc.useContext();

  const t = useTranslations("Product");

  const toggleModal = async (open: boolean) => {
    await utils.features.getFeatures.fetch().then((response) => {
      setFeatures(response.features);
      setOpen(open);
    });
  };

  const renderButton = () => {
    if (emptyState) {
      return (
        <Button>
          <PlusIcon />
          {t("add")}
        </Button>
      );
    }
    return (
      <Button
        variant={editing ? "ghost" : "outline"}
        size={editing ? "sm" : "icon"}
      >
        {editing ? t("edit") : "+"}
      </Button>
    );
  };

  return (
    <Dialog onOpenChange={toggleModal} open={open}>
      <DialogTrigger asChild>{renderButton()}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-5 pt-5">
          <DialogTitle>{editing ? t("edit") : t("add")}</DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-5 relative">
          <ProductForm
            closeModal={closeModal}
            product={product}
            features={features}
          />
          <div className="absolute bottom-5 right-5">
            <FeatureModal emptyState toggleProductModal={toggleModal} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
