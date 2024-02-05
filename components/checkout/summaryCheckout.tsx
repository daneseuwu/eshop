"use client";
import React, { useEffect, useState } from "react";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
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
    <div>
      <CardHeader className="text-xl font-medium">
        <Label>Delivery address</Label>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <Label >{address.firstname} {address.lastname}</Label>
        <Label className="text-xs">{address.address}</Label>
        <Label className="text-xs">{address.country}</Label>
        <Label className="text-xs">{address.city}</Label>
        <Label className="text-xs">{address.state}</Label>
        <Label className="text-xs">{address.postalCode}</Label>
        <Label className="text-xs">{address.phone}</Label>
        <Label className="text-xs">{address.instructions}</Label>
      </CardContent>

      <CardHeader className="text-xl font-medium">
        <Label>Delivery summary</Label>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">No. Products</Label>
          <Label className="text-xs">{itemsInCart} products</Label>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-xs">Subtotal</Label>
          <Label className="text-xs">{currencyFormat(subtotal)}</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Taxes 5%</Label>
          <Label className="text-xs">{currencyFormat(taxes)}</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-xs">Total</Label>
          <Label className="text-xs">{currencyFormat(total)}</Label>
        </div>
      </CardContent>

      <CardFooter>
        <Label className="text-xs">
          Al hacer click en <strong>colocar Order</strong>, aceptas los
          términos, condiciones y políticas de privacidad.
        </Label>
      </CardFooter>

      <CardFooter className="flex justify-between ">
        <Button
          className={clsx("w-full", {
            "bg-gray-950": !disableOrder,
            " bg-gray-400  cursor-not-allowed": disableOrder,
          })}
          onClick={onOrder}
        >
          Order
        </Button>
      </CardFooter>
    </div>
  );
};

export default SummaryCheckout;
