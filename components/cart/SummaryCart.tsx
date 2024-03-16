"use client";

import { useCartStore } from "@/store/cart/product";
import { useEffect, useState } from "react";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { currencyFormat } from "@/utils/format";
import { Label } from "../ui/label";

const SummaryCart = () => {
  const [loading, setLoading] = useState(false);

  const { subtotal, taxes, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }

  return (
    <main>
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
        <Button className="w-full">
          <Link href="/checkout/address/">Checkout</Link>
        </Button>
      </CardFooter>
    </main>
  );
};

export default SummaryCart;
