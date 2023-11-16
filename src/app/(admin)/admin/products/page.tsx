import ProductList from "@/components/products/ProductList";
import NewProductModal from "@/components/products/ProductModal";
import { getProducts } from "@/lib/api/products/queries";

export default async function Products() {
  const { products } = await getProducts();

  return (
    <main className="flex-grow p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Products</h1>
        <NewProductModal emptyState />
      </div>
      <div className="w-full overflow-auto">
        <ProductList products={products} />
      </div>
    </main>
  );
}
