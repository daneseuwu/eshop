"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import { useAddressStore } from "@/store/address/address";
import { order } from "@/actions/order/palceorders";
import { useRouter } from "next/navigation";
import { CiMoneyCheck1 } from "react-icons/ci";

interface Props {
  orderuser: {
    firstname: string;
    lastname: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    phone: string;
    instructions: string;
  };
}
const SummaryOrders = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { subtotal, taxes, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const onOrder = async () => {
    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    //server action
    const res = await order(productToOrder, address);

    if (!res.ok) {
      return;
    }

    clearCart();
    router.replace("/orders/" + res.order?.id);
  };

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }

  return (
    <main>
      <Card className="border-0">
        <CardHeader className="text-xl font-medium">
          Delivery address
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <Label>
            {address.firstname} {address.lastname}
          </Label>
          <Label>{address.address}</Label>
          <Label>{address.country}</Label>
          <Label>{address.city}</Label>
          <Label>{address.state}</Label>
          <Label>{address.postalCode}</Label>
          <Label>{address.phone}</Label>
          <Label>{address.instructions}</Label>
        </CardContent>

        <CardHeader className="text-xl font-medium">
          Purchase details
        </CardHeader>

        <CardContent className="flex justify-between">
          <Label>No. Products</Label>
          <Label>{itemsInCart} products</Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Subtotal</Label>
          <Label>{currencyFormat(subtotal)}</Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Taxes 5%</Label>
          <Label>{currencyFormat(taxes)}</Label>
        </CardContent>

        <CardContent className="flex justify-between">
          <Label>Total</Label>
          <Label>{currencyFormat(total)}</Label>
        </CardContent>

        <CardFooter className="flex justify-between ">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-2 py-2 w-full rounded-lg my-2">
            <CiMoneyCheck1 size={30} className="text-green-600" />
            <Label className="text-green-600 text-xs ">Paid</Label>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SummaryOrders;
