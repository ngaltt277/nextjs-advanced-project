import { db } from "@/lib/db/index";
import {
  FeatureId,
  NewFeatureParams,
  UpdateFeatureParams,
  featureIdSchema,
  insertFeatureSchema,
  updateFeatureSchema,
} from "@/lib/db/schema/features";

export const createFeature = async (feature: NewFeatureParams) => {
  const newFeature = insertFeatureSchema.parse(feature);
  try {
    const p = await db.feature.create({
      data: newFeature,
    });
    return { feature: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateFeature = async (
  id: FeatureId,
  feature: UpdateFeatureParams
) => {
  const { id: featureId } = featureIdSchema.parse({ id });
  const newFeature = updateFeatureSchema.parse(feature);
  try {
    const p = await db.feature.update({
      where: { id: featureId },
      data: { ...newFeature, id: newFeature.id },
    });
    return { feature: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteFeature = async (id: FeatureId) => {
  const { id: featureId } = featureIdSchema.parse({ id });
  try {
    const p = await db.feature.delete({ where: { id: featureId } });
    return { feature: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
