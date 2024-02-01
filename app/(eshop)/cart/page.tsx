import ProductInCart from "@/components/cart/productInCart";
import Summary from "@/components/cart/summary";
import Title from "@/components/title/title";

const ProductCart = () => {
  return (
    <main>
      <span className="md:px-16">
        <Title title="Products cart" />
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:px-16">
        <ProductInCart />
        <Summary />
      </div>
    </main>
  );
};

export default ProductCart;
