import ProductInCart from "@/components/cart/productInCart";
import SummaryCart from "@/components/cart/SummaryCart";
import Title from "@/components/title/title";

const ProductCart = () => {
  return (
    <main>
      <Title title="Cart" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
        <ProductInCart />
        <SummaryCart />
      </div>
    </main>
  );
};

export default ProductCart;
