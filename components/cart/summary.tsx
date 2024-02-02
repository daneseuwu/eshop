"use client";
import React, { useEffect, useState } from "react";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";

const Summary = () => {
  const [loading, setLoading] = useState(false);

  const { subtotal, taxes, total, itemsInCart } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }
  return (
    <div className="h-72 rounded-xl border">
      <CardContent className="flex items-center justify-between">
        <Label>No. Products</Label>
        <Label>{itemsInCart} products</Label>
      </CardContent>
      <CardContent className="flex items-center justify-between">
        <Label>Subtotal</Label>
        <Label>{currencyFormat(subtotal)}</Label>
      </CardContent>

      <CardContent className="flex items-center justify-between">
        <Label>Taxes 5%</Label>
        <Label>{currencyFormat(taxes)}</Label>
      </CardContent>

      <CardContent className="flex items-center justify-between">
        <Label>Total</Label>
        <Label>{currencyFormat(total)}</Label>
      </CardContent>

      <CardFooter>
        <Button className="w-72">
          <Link href="/checkout/address/">Checkout</Link>
        </Button>
      </CardFooter>
    </div>
  );
};

export default Summary;
