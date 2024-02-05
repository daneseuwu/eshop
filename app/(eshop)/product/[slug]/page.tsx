import { productSlug } from "@/actions/products/product";
import CarouselImage from "@/components/product/carousel";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Addtocart from "../cart/addtocart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:px-16">
      <CarouselImage images={product.images} title={product.title} />
      <div className="border rounded-2xl md:h-[550px]">
        <Addtocart product={product} />
      </div>
    </div>
  );
};

export default Page;
