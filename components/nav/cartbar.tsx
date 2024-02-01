"use client";
import { useCartStore } from "@/store/cart/product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoBagHandle } from "react-icons/io5";

const Cartbar = () => {
  const totalItemCart = useCartStore((state) => state.getTotalItem());
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState("");

  useEffect(() => {
    setUrls(totalItemCart === 0 ? "/empty" : "/cart");
    setLoading(true);
  }, [totalItemCart]);

  return (
    <Link href={urls} className="relative">
      {loading && totalItemCart > 0 && (
        <p className="absolute flex justify-center items-center top-0 -right-2 rounded-full  w-5 h-5 bg-gray-900 text-white text-[10px] ">
          {totalItemCart}
        </p>
      )}
      <IoBagHandle size={25} />
    </Link>
  );
};

export default Cartbar;
