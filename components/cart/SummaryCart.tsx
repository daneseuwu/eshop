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
    <div className="border rounded-2xl h-60">
      <CardHeader className="text-xl font-medium">
        <Label>Delivery summary</Label>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Label className="text-sm">No. Products</Label>
          <Label className="text-sm">{itemsInCart} products</Label>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-sm">Subtotal</Label>
          <Label className="text-sm">{currencyFormat(subtotal)}</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Taxes 5%</Label>
          <Label className="text-sm">{currencyFormat(taxes)}</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-sm">Total</Label>
          <Label className="text-sm">{currencyFormat(total)}</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link href="/checkout/address/">Checkout</Link>
        </Button>
      </CardFooter>
    </div>
  );
};

export default SummaryCart;
