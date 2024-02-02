"use client";
import Quantity from "@/components/product/quantity-selector/quantity";
import SizeSelector from "@/components/product/select-size/sizes";
import { Button } from "@/components/ui/button";
import { CardDescription, CardFooter } from "@/components/ui/card";
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
      <SizeSelector
        availableSize={product.sizes}
        selectedSize={size}
        changeSize={setSize}
      />

      <Quantity quantity={quantity} onQuantityChanged={setQuantity} />

      <div className=" flex flex-col py-4 text-justify">
        <Label>Description</Label>
        <CardDescription>{product?.description}</CardDescription>
      </div>

      <CardFooter>
        <Button onClick={() => addTocart()}>Add to cart</Button>
      </CardFooter>
    </main>
  );
};

export default Addtocart;
