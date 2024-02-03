import ProductInCart from "@/components/cart/productInCart";
import SummaryCart from "@/components/cart/SummaryCart";

const ProductCart = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
      <ProductInCart />
      <SummaryCart />
    </div>
  );
};

export default ProductCart;
