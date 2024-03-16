"use client";
import Quantity from "@/components/product/quantity-selector/quantity";
import SizeSelector from "@/components/product/select-size/sizes";
import Stock from "@/components/product/stock/stock";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CartProduct, Product, Size } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/product";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  product: Product;
}

const Addtocart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  if (posted && !size) {
    toast.warning("Please select a size");
  }

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addTocart = () => {
    setPosted(true);
    setPosted(true);

    if (!size) return;
    const cartProducto: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      image: product.images[0],
    };
    addProductToCart(cartProducto);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <main>
      <CardHeader className="font-semibold text-2xl">
        {product?.title}
      </CardHeader>

      <CardContent>
        <Stock slug={product.slug} />

        <div className="flex flex-col gap-2 py-2">
          <Label className="text-xs">Price</Label>
          <Label className="text-xs">$ {product?.price}</Label>
        </div>
        <div className="py-2">
          <SizeSelector
            availableSize={product.sizes}
            selectedSize={size}
            changeSize={setSize}
          />
        </div>

        <div className="py-2">
          <Quantity quantity={quantity} onQuantityChanged={setQuantity} />
        </div>

        <div className="py-2">
          <Label className="text-xs">Description</Label>
          <CardDescription className="text-xs">
            {product?.description}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter className="w-full flex flex-col gap-2">
        <Button
          onClick={() => addTocart()}
          variant="default"
          className="w-full"
        >
          Add to cart
        </Button>
      </CardFooter>
    </main>
  );
};

export default Addtocart;
