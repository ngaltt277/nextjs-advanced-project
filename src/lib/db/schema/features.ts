import { getFeatures } from "@/lib/api/features/queries";
import { featureSchema } from "@/zodAutoGenSchemas";
import { z } from "zod";

// Schema for products - used to validate API requests
export const insertFeatureSchema = featureSchema.omit({ id: true });

export const insertFeatureParams = featureSchema.omit({
  id: true,
});

export const updateFeatureSchema = featureSchema;

export const updateFeatureParams = updateFeatureSchema.extend({});

export const featureIdSchema = updateFeatureSchema.pick({ id: true });

// Types for products - used to type API request params and within Components
export type Feature = z.infer<typeof updateFeatureSchema>;
export type NewFeature = z.infer<typeof insertFeatureParams>;
export type NewFeatureParams = z.infer<typeof insertFeatureParams>;
export type UpdateFeatureParams = z.infer<typeof updateFeatureSchema>;
export type FeatureId = z.infer<typeof featureIdSchema>["id"];

export type CompleteFeature = Awaited<
  ReturnType<typeof getFeatures>
>["features"][number];
