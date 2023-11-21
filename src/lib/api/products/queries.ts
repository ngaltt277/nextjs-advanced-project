import { db } from "@/lib/db/index";
import { type ProductId, productIdSchema } from "@/lib/db/schema/products";

export const getProducts = async () => {
  const p = await db.product.findMany({ include: { subscriptions: true } });
  return { products: p };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const p = await db.product.findFirst({
    where: { id: productId },
    include: { subscriptions: true },
  });
  return { products: p };
};

export const getTopProducts = async () => {
  return await db.product.findMany({
    include: {
      _count: {
        select: { subscriptions: true },
      },
    },
    orderBy: {
      subscriptions: {
        _count: "desc",
      },
    },
    take: 3,
  });
};
