import { orderId } from "@/actions/order/orderid";
import PaypalButton from "@/components/orders/paypal/button";
import ProductImage from "@/components/product/image/productImage";
import Title from "@/components/title/title";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currencyFormat } from "@/utils/format";
import { redirect } from "next/navigation";
import React from "react";
import { CiBadgeDollar } from "react-icons/ci";

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
    <main>
      <Title title={`Order ${id.substring(24, 50)}`} />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
        <ScrollArea className="md:h-[550px]">
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
                    <Label>{product.product.title}</Label>
                    <div className="flex gap-2">
                      <Label className="text-xs">Price :</Label>
                      <Label className="text-xs">
                        ${product.price} x {product.quantity}
                      </Label>
                    </div>

                    <div className="flex gap-2">
                      <Label className="text-xs">Size :</Label>
                      <Label className="text-xs">{product.size}</Label>
                    </div>

                    <div className="flex gap-2">
                      <Label className="text-xs">Subtotal :</Label>
                      <Label className="text-xs">
                        {currencyFormat(product.price * product.quantity)}
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border rounded-2xl md:h-[580px]">
          <CardHeader className="text-xl font-medium">
            <Label>Delivery address</Label>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <Label>
              {address!.firstname} {address!.lastname}
            </Label>
            <Label className="text-xs">{address!.address!}</Label>
            <Label className="text-xs">{address!.countryId}</Label>
            <Label className="text-xs">{address!.city}</Label>
            <Label className="text-xs">{address!.state}</Label>
            <Label className="text-xs">{address!.postalCode}</Label>
            <Label className="text-xs">{address!.phone}</Label>
            <Label className="text-xs">{address!.instructions}</Label>
          </CardContent>

          <CardHeader className="text-xl font-medium">
            <Label>Delivery summary</Label>
          </CardHeader>

          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs">No. Products</Label>
              <Label className="text-xs">
                {order?.itemInOrder === 1
                  ? "1 products"
                  : `${order?.itemInOrder} products`}
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-xs">Subtotal</Label>
              <Label className="text-xs">
                {currencyFormat(order!.subtotal)}
              </Label>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs">Taxes 5%</Label>
              <Label className="text-xs">{currencyFormat(order!.tax)}</Label>
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs">Total</Label>
              <Label className="text-xs">{currencyFormat(order!.total)}</Label>
            </div>
          </CardContent>

          <CardFooter>
            <Label className="text-xs">
              Al hacer click en <strong>colocar Order</strong>, aceptas los
              términos, condiciones y políticas de privacidad.
            </Label>
          </CardFooter>

          {!order?.isPaid ? (
            <PaypalButton amount={order!.total} orderId={order!.id} />
          ) : (
            <Button
              variant="default"
              size="sm"
              className="flex w-full items-center gap-2"
            >
              <CiBadgeDollar size={20} />
              Paid
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
