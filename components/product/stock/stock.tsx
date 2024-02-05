"use client";
import { stockSlug } from "@/actions/products/stock";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

const Stock = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const getStockSLug = async () => {
      const instock = await stockSlug(slug);
      setStock(instock as number);
    };
    getStockSLug();
  }, [slug]);

  return (
    <div className="flex flex-col gap-2 py-4">
      <Label className="text-xs">Stock</Label>
      <Label className="text-xs">{stock}</Label>
    </div>
  );
};

export default Stock;
