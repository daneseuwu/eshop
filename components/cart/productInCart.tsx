"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CardContent, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { MinusIcon } from "@radix-ui/react-icons";
import Quantity from "../product/quantity-selector/quantity";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";

import ProductImage from "../product/image/productImage";

const ProductInCart = () => {
  const [loading, setLoading] = useState(false);

  const productInCart = useCartStore((state) => state.cart);
  const removeProductCart = useCartStore((state) => state.removeProduct);

  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }
  return (
    <main>
      <ScrollArea className="h-[550px]">
        <div className="flex flex-col gap-2">
          {productInCart.map((product) => (
            <div className="relative rounded-2xl border" key={product.slug}>
              <Label className="absolute right-1 top-1 rounded-full bg-gray-100 p-0.5 text-gray-400">
                <MinusIcon
                  className="cursor-pointer"
                  onClick={() => removeProductCart(product)}
                />
              </Label>
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
                    <Quantity
                      quantity={product.quantity}
                      onQuantityChanged={(quantity) =>
                        updateProductQuantity(product, quantity)
                      }
                    />
                  </Label>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </ScrollArea>
    </main>
  );
};

export default ProductInCart;
