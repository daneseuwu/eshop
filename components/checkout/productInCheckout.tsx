"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";
import { Button } from "../ui/button";
import ProductImage from "../product/image/productImage";

const ProductInCheckout = () => {
  const [loading, setLoading] = useState(false);
  const productInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }
  return (
    <div>
      <ScrollArea className="h-[550px]">
        <Button size="sm" className="mb-2 flex w-full items-center gap-2">
          <Link href="/cart">Edit cart</Link>
        </Button>
        <div className="flex flex-col gap-2">
          {productInCart.map((product) => (
            <div className="relative rounded-2xl border" key={product.slug}>
              <CardContent className="flex gap-2 py-2">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="rounded-2xl object-cover"
                />

                <div className="flex flex-col gap-2">
                  <Label>{product.title}</Label>
                  <Label className="flex gap-2 text-xs">
                    <span>Price :</span>
                    <span>
                      {currencyFormat(product.price * product.quantity)}
                    </span>
                  </Label>

                  <Label className="flex gap-2 text-xs">
                    <span>Size :</span>
                    <span>{product.size}</span>
                  </Label>

                  <Label className="flex gap-2 text-xs">
                    <span>Quantity :</span>
                    <span>{product.quantity}</span>
                  </Label>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProductInCheckout;
