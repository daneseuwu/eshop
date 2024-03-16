"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { MinusIcon } from "@radix-ui/react-icons";
import Quantity from "../product/quantity-selector/quantity";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import ProductImage from "../product/image/productImage";
import Link from "next/link";

const ProductInCart = () => {
  const productInCart = useCartStore((state) => state.cart);
  const removeProductCart = useCartStore((state) => state.removeProduct);

  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

  return (
    <ScrollArea className="md:h-[550px]">
      <div className="flex flex-col gap-2">
        {productInCart.map((product) => (
          <div
            className="relative rounded-2xl border"
            key={`${product.slug}-${product.size}`}
          >
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
                <Link
                  href={`product/${product.slug}`}
                  className="hover:underline"
                >
                  <Label>{product.title}</Label>
                </Link>
                <div className="flex gap-2">
                  <Label className="text-xs">Price :</Label>
                  <Label className="text-xs">
                    {currencyFormat(product.price * product.quantity)}
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Label className="text-xs">Size :</Label>
                  <Label className="text-xs">{product.size}</Label>
                </div>

                <div className="flex gap-2">
                  <Quantity
                    quantity={product.quantity}
                    onQuantityChanged={(quantity) =>
                      updateProductQuantity(product, quantity)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductInCart;
