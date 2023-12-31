import {
  getProductById,
  getProductByName,
  getProducts,
} from "@/lib/api/products/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  productIdSchema,
  insertProductParams,
  updateProductParams,
  productNameSchema,
} from "@/lib/db/schema/products";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/lib/api/products/mutations";

export const productsRouter = router({
  getProducts: publicProcedure.query(async () => {
    return getProducts();
  }),
  getProductById: publicProcedure
    .input(productIdSchema)
    .query(async ({ input }) => {
      return getProductById(input.id);
    }),
  getProductByName: publicProcedure
    .input(productNameSchema)
    .query(async ({ input }) => {
      return getProductByName(input.name);
    }),
  createProduct: publicProcedure
    .input(insertProductParams)
    .mutation(async ({ input }) => {
      return createProduct(input);
    }),
  updateProduct: publicProcedure
    .input(updateProductParams)
    .mutation(async ({ input }) => {
      return updateProduct(input.id, input);
    }),
  deleteProduct: publicProcedure
    .input(productIdSchema)
    .mutation(async ({ input }) => {
      return deleteProduct(input.id);
    }),
});
