"use client";

import {
  NewProductParams,
  CompleteProduct,
  insertProductParams,
} from "@/lib/db/schema/products";
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
import { FeaturesMultiSelect } from "../features/FeaturesMultiSelect";
import { Feature } from "@/lib/db/schema/features";
import { useTranslations } from "next-intl";

type Props = {
  product: CompleteProduct;
  features: Feature[];
  closeModal: () => void;
};

const ProductForm = ({ product, features, closeModal }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();
  const t = useTranslations("Product");

  const editing = !!product?.id;

  const form = useForm<z.infer<typeof insertProductParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertProductParams),
    defaultValues: product ?? {
      name: "",
      price: 0,
      description: "",
      features: [] as Feature[],
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.products.getProducts.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: t("success"),
      description: t("success-message", { action }),
      variant: "default",
    });
  };

  const { mutate: createProduct, isLoading: isCreating } =
    trpc.products.createProduct.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateProduct, isLoading: isUpdating } =
    trpc.products.updateProduct.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteProduct, isLoading: isDeleting } =
    trpc.products.deleteProduct.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewProductParams) => {
    if (editing) {
      updateProduct({ ...values, id: product.id });
    } else {
      createProduct(values);
    }
  };

  const renderLabelButton = () => {
    if (editing) {
      if (isUpdating) {
        return `${t("updating")}...`;
      }
      return t("update");
    }
    if (isCreating) {
      return `${t("creating")}...`;
    }
    return t("create");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("price")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("features")}</FormLabel>
              <FormControl>
                <FeaturesMultiSelect features={features} field={field} />
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
          {renderLabelButton()}
        </Button>
        {editing && (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteProduct({ id: product.id })}
          >
            {isDeleting ? `${t("deleting")}...` : t("delete")}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ProductForm;
