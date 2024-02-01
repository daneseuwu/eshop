"use server";
import { orderId } from "@/actions/order/orderid";
import PaypalButton from "@/components/orders/paypal/button";
import ProductImage from "@/components/product/image/productImage";
import Title from "@/components/title/title";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currencyFormat } from "@/utils/format";
import { redirect } from "next/navigation";

import { CiDeliveryTruck, CiBadgeDollar } from "react-icons/ci";

interface Props {
  params: {
    id: string;
  };
}
const Page = async ({ params }: Props) => {
  const { id } = params;

  const { ok, order } = await orderId(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
      {/* <Title title={`Order # ${order?.id.substring(24, 50).toUpperCase()}`} /> */}
      <ScrollArea className="h-[550px]">
        <div className="py-2 md:px-2">
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
                className="relative rounded-xl border"
                key={product.product.slug}
              >
                <CardContent className="flex gap-2 py-2">
                  <ProductImage
                    src={product.product.ProductImage[0]?.url}
                    alt={product.product.title}
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
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

      <div className="rounded-xl border">
        <p className="flex items-center space-y-1.5 p-4">
          <CiDeliveryTruck size={30} />
          <Label>Delivery address</Label>
        </p>

        <CardContent className="flex flex-col gap-2">
          <Label className="text-lg">
            {address!.firstname} {address!.lastname}
          </Label>
          <Label>{address!.address!}</Label>
          <Label>{address!.countryId}</Label>
          <Label>{address!.city}</Label>
          <Label>{address!.state}</Label>
          <Label>{address!.postalCode}</Label>
          <Label>{address!.phone}</Label>
          <Label>{address!.instructions}</Label>
        </CardContent>

        <p className="flex items-center space-y-1.5 p-4">
          <CiBadgeDollar size={30} />
          <Label>Purchase details</Label>
        </p>

        <CardContent className="flex justify-between">
          <Label>No. Products</Label>
          <Label>
            {order?.itemInOrder === 1
              ? "1 product"
              : `${order?.itemInOrder} products`}
          </Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Subtotal</Label>
          <Label>{currencyFormat(order!.subtotal)}</Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Taxes 5%</Label>
          <Label>{currencyFormat(order!.tax)}</Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Total</Label>
          <Label>{currencyFormat(order!.total)}</Label>
        </CardContent>

        {!order?.isPaid ? (
          <PaypalButton amount={order!.total} orderId={order!.id} />
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
      </div>
    </div>
  );
};

export default Page;
