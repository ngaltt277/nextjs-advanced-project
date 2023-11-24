import { db } from "@/lib/db/index";
import { type ProductId, productIdSchema } from "@/lib/db/schema/products";

export const getProducts = async () => {
  const p = await db.product.findMany({
    include: { subscriptions: true, features: true },
  });
  return { products: p };
};

export const getProductById = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  const p = await db.product.findFirst({
    where: { id: productId },
    include: { subscriptions: true, features: true },
  });
  return { product: p };
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

export const getProductByName = async (name: string) => {
  return await db.product.findMany({
    where: { name: { contains: name } },
    include: { subscriptions: true, features: true },
  });
};
