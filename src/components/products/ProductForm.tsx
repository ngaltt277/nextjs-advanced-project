"use client";

import {
  Product,
  NewProductParams,
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

type Props = {
  product?: Product;
  closeModal: () => void;
};

const ProductForm = ({ product, closeModal }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

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
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.products.getProducts.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Product ${action}d!`,
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
        return "Updating...";
      }
      return "Update";
    } else if (isCreating) {
      return "Creating...";
    }
    return "Create";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
              <FormLabel>Price</FormLabel>
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
              <FormLabel>Description</FormLabel>
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
          {renderLabelButton()}
        </Button>
        {editing && (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteProduct({ id: product.id })}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ProductForm;
