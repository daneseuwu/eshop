import ProductInCart from "@/components/cart/productInCart";
import Summary from "@/components/cart/summary";

const ProductCart = () => {
  return (
    <main>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
        <ProductInCart />
        <Summary />
      </div>
    </main>
  );
};

export default ProductCart;
