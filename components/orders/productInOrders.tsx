"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { CardContent } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";
import { useCartStore } from "@/store/cart/product";
import { currencyFormat } from "@/utils/format";
import { CiMoneyCheck1 } from "react-icons/ci";

const ProductInOrders = () => {
  const [loading, setLoading] = useState(false);
  const productInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return;
  }
  return (
    <ScrollArea className="h-[550px]">
      <div className="md:px-2 py-2">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-2 py-2 w-full  rounded-2xl my-2">
          <CiMoneyCheck1 size={30} className="text-green-600" />
          <Label className="text-green-600 text-xs ">Paid</Label>
        </div>
        <div className="flex flex-col gap-2">
          {productInCart.map((product) => (
            <div className="border rounded-2xl relative" key={product.slug}>
              <CardContent className="flex gap-2 py-2">
                <Image
                  src={`/products/${product.image}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  priority
                  className="object-cover rounded-2xl"
                />

                <div className="flex flex-col gap-2">
                  <p className="text-xs sm:text-xs font-medium overflow-scroll  overflow-x-auto">
                    {product.title}
                  </p>
                  <Label className="text-xs flex gap-2">
                    <span>Price :</span>
                    <span>
                      {currencyFormat(product.price * product.quantity)}
                    </span>
                  </Label>

                  <Label className="text-xs flex gap-2">
                    <span>Size :</span>
                    <span>{product.size}</span>
                  </Label>

                  <Label className="text-xs flex gap-2">
                    <span>Quantity :</span>
                    <span>{product.quantity}</span>
                  </Label>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProductInOrders;
