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
    <ScrollArea className="h-[595px]">
      <Button className="absolute right-4 top-0 z-50">
        <Link href="/cart">Edit cart</Link>
      </Button>
      <div className="flex flex-col gap-2">
        {productInCart.map((product) => (
          <div className="relative rounded-xl border" key={product.slug}>
            <CardContent className="flex gap-2 py-2">
              <ProductImage
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />

              <div className="flex flex-col gap-2">
                <p className="overflow-scroll overflow-x-auto text-xs font-medium  sm:text-xs">
                  {product.title}
                </p>
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
  );
};

export default ProductInCheckout;
