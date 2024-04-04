"use client";
import { Product } from "@/interfaces/product.interface";
import { useState } from "react";
import { currencyFormat } from "@/utils/format";
import Link from "next/link";
import ProductImage from "../product/image/productImage";
import { Label } from "../ui/label";
import { CiHeart } from "react-icons/ci";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="fade-in relative">
      <span className="absolute p-2 bg-white rounded-lg  right-1.5 top-1.5">
        <CiHeart />
      </span>
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
        <Link href={`/product/${product.slug}`} className="text-lg">
          <Label className="cursor-pointer hover:underline">{product.title}</Label>
        </Link>
      </div>

      <div className="flex  justify-between items-center">
        <Label>{currencyFormat(product.price)}</Label>
      </div>
    </div>
  );
};

export default ProductCard;
