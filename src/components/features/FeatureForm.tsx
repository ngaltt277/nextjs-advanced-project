"use client";

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
import {
  Feature,
  NewFeatureParams,
  insertFeatureParams,
} from "@/lib/db/schema/features";

type Props = {
  feature: Feature;
  closeModal: () => void;
  toggleProductModal?: (value: boolean) => void;
};

const FeatureForm = ({ feature, closeModal, toggleProductModal }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertFeatureParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertFeatureParams),
    defaultValues: feature ?? {
      name: "",
    },
  });

  const editing = !!feature?.id;

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.features.getFeatures.invalidate();
    if (toggleProductModal) {
      toggleProductModal(true);
    }
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Feature ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createFeature, isLoading: isCreating } =
    trpc.features.createFeature.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateFeature, isLoading: isUpdating } =
    trpc.features.updateFeature.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteFeature, isLoading: isDeleting } =
    trpc.features.deleteFeature.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewFeatureParams) => {
    if (editing) {
      updateFeature({ ...values, id: feature.id });
    } else {
      createFeature(values);
    }
  };

  const renderLabelButton = () => {
    if (editing) {
      if (isUpdating) {
        return "Updating...";
      }
      return "Update";
    }
    if (isCreating) {
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
            onClick={() => deleteFeature({ id: feature.id })}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        )}
      </form>
    </Form>
  );
};

export default FeatureForm;
