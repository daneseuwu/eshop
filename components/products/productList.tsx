import { Product } from "@/interfaces/product.interface";
import ProductCard from "./productCard";

interface Props {
  products: Product[];
}
const ProductList = ({ products }: Props) => {
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-5">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductList;
