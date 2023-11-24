import {
  createFeature,
  deleteFeature,
  updateFeature,
} from "@/lib/api/features/mutations";
import { getFeatures } from "@/lib/api/features/queries";
import {
  insertFeatureParams,
  updateFeatureParams,
} from "@/lib/db/schema/features";
import { productIdSchema } from "@/lib/db/schema/products";
import { publicProcedure, router } from "@/lib/server/trpc";

export const featuresRouter = router({
  getFeatures: publicProcedure.query(async () => {
    return getFeatures();
  }),
  createFeature: publicProcedure
    .input(insertFeatureParams)
    .mutation(async ({ input }) => {
      return createFeature(input);
    }),
  updateFeature: publicProcedure
    .input(updateFeatureParams)
    .mutation(async ({ input }) => {
      return updateFeature(input.id, input);
    }),
  deleteFeature: publicProcedure
    .input(productIdSchema)
    .mutation(async ({ input }) => {
      return deleteFeature(input.id);
    }),
});
