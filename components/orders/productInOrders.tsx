import { orderId } from "@/actions/order/orderid";
import { ScrollArea } from "../ui/scroll-area";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { CiBadgeDollar } from "react-icons/ci";
import { CardContent } from "../ui/card";
import ProductImage from "../product/image/productImage";
import { Label } from "../ui/label";
import { currencyFormat } from "@/utils/format";
import { OrderAddress } from "@prisma/client";

interface Props {
  params: {
    id: string;
  };
}
const ProductInOrders = async ({ params }: Props) => {
  const { id } = params;

  const { ok, order } = await orderId(id);

  if (!ok) {
    redirect("/");
  }
  return (
    <div>
      <ScrollArea className="md:h-[550px]">
        <div className="md:px-2">
          {!order?.isPaid ? (
            <Button
              variant="destructive"
              size="sm"
              className="mb-2 flex w-full items-center gap-2"
            >
              <CiBadgeDollar size={20} />
              Not payed
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              className="mb-2 flex w-full items-center gap-2"
            >
              <CiBadgeDollar size={20} />
              Paid
            </Button>
          )}
          <div className="flex flex-col gap-2">
            {order?.OrderItem.map((product) => (
              <div
                className="relative rounded-2xl border"
                key={product.product.slug}
              >
                <CardContent className="flex gap-2 py-2">
                  <ProductImage
                    src={product.product.ProductImage[0]?.url}
                    alt={product.product.title}
                    width={100}
                    height={100}
                    className="rounded-2xl object-cover"
                  />

                  <div className="flex flex-col gap-2">
                    <p className="overflow-scroll overflow-x-auto text-xs font-medium  sm:text-xs">
                      {product.product.title}
                    </p>

                    <Label className="flex gap-2 text-xs">
                      ${product.price} x {product.quantity}
                    </Label>

                    <Label className="flex gap-2 text-xs">
                      <span>Subtotal :</span>
                      <span>
                        {currencyFormat(product.price * product.quantity)}
                      </span>
                    </Label>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductInOrders;
