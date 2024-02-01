import { productSlug } from "@/actions/products/product";
import CarouselImage from "@/components/product/carousel";
import Stock from "@/components/product/stock/stock";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Addtocart from "../cart/addtocart";
import Summary from "@/components/cart/summary";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;
  const product = await productSlug(slug);

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images[1]}`],
    },
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = params;
  const product = await productSlug(slug);

  if (!product) {
    notFound();
  }
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2  ">
      <CarouselImage images={product.images} title={product.title} />
      <div className="rounded-xl border">
        <CardContent>
          <Label className="pt-2 text-2xl font-bold uppercase">
            {product?.title}
          </Label>

          <Stock slug={product.slug} />

          <Label className="flex flex-col gap-2 py-4">
            <span>Price</span>
            <span>$ {product?.price}</span>
          </Label>

          <Addtocart product={product} />
        </CardContent>
      </div>
    </div>
  );
};

export default Page;
