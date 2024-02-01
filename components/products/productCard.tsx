"use client";
import { Product } from "@/interfaces/product.interface";
import { useState } from "react";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";
import ProductImage from "../product/image/productImage";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="fade-in">
      <ProductImage
        src={displayImage}
        alt={product.title}
        width={500}
        height={500}
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
        className="w-full  h-[350px] object-cover rounded-2xl overflow-hidden"
      />

      <div className="py-2">
        <Link href={`/product/${product.slug}`} className="text-lg font-normal">
          <p className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {product.title}
          </p>
        </Link>
      </div>

      <div className="flex  justify-between items-center">
        <p className="font-normal">{currencyFormat(product.price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
