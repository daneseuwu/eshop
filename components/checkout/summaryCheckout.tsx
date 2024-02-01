"use client";
import React, { useEffect, useState } from "react";
import {  CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import { useAddressStore } from "@/store/address/address";
import clsx from "clsx";
import { order } from "@/actions/order/palceorders";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SummaryCheckout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disableOrder, setDisableOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { subtotal, taxes, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoading(true);
  }, []);

  const onOrder = async () => {
    setDisableOrder(true);

    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    //server action
    const res = await order(productToOrder, address);

    if (!res.ok) {
      setDisableOrder(false);
      toast.error(res.message);
      return;
    }

    toast.success(res.success);
    clearCart();
    router.replace("/orders/" + res.order?.id);
  };

  if (!loading) {
    return;
  }

  return (
    <main>
      <div className="border rounded-xl">
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

        <CardFooter>
          <Label className="text-xs">
            Al hacer click en <strong>colocar Order</strong>, aceptas los
            términos, condiciones y políticas de privacidad.
          </Label>
        </CardFooter>

        <CardFooter className="flex justify-between ">
          <Button
            className={clsx("w-72", {
              "bg-gray-950": !disableOrder,
              " bg-gray-400  cursor-not-allowed": disableOrder,
            })}
            onClick={onOrder}
          >
            Order
          </Button>
        </CardFooter>
      </div>
    </main>
  );
};

export default SummaryCheckout;
