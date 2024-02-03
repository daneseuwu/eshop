import ProductInCheckout from "@/components/checkout/productInCheckout";
import SummaryCheckout from "@/components/checkout/summaryCheckout";

const Page = () => {
  return (
    <main>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
        <ProductInCheckout />
        <SummaryCheckout />
      </div>
    </main>
  );
};

export default Page;
