import { db } from "@/lib/db/index";
import {
  ProductId,
  NewProductParams,
  UpdateProductParams,
  updateProductSchema,
  insertProductSchema,
  productIdSchema,
} from "@/lib/db/schema/products";

export const createProduct = async (product: NewProductParams) => {
  const newProduct = insertProductSchema.parse(product);
  try {
    const p = await db.product.create({
      data: {
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        features: { connect: newProduct.features },
      },
    });
    return { product: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateProduct = async (
  id: ProductId,
  product: UpdateProductParams
) => {
  const { id: productId } = productIdSchema.parse({ id });
  const newProduct = updateProductSchema.parse(product);
  try {
    const p = await db.product.update({
      where: { id: productId },
      data: {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        features: { set: [], connect: newProduct.features },
      },
    });
    return { product: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteProduct = async (id: ProductId) => {
  const { id: productId } = productIdSchema.parse({ id });
  try {
    const p = await db.product.delete({ where: { id: productId } });
    return { product: p };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
