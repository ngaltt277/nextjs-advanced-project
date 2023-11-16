import { Product } from "@/lib/db/schema/products";
import ProductModal from "./ProductModal";

type Props = {
  product: Product;
};

export default function Product({ product }: Props) {
  return (
    <tr
      key={product.id}
      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
    >
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {product.name}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        ${product.price / 100}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {product.description}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <ProductModal product={product} />
      </td>
    </tr>
  );
}
