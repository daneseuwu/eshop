import ProductInCheckout from "@/components/checkout/productInCheckout";
import SummaryCheckout from "@/components/checkout/summaryCheckout";

const Page = () => {
  
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
      <ProductInCheckout />
      <div className="border rounded-2xl md:h-[550px]">
        <SummaryCheckout />
      </div>
    </div>
  );
};

export default Page;
