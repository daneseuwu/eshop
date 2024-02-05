"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductImage from "./image/productImage";

interface Props {
  images: string[];
  title: string;
}
const CarouselImage = ({ images, title }: Props) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <ProductImage
            src={images[0]}
            alt={title}
            width={600}
            height={600}
            className="rounded-2xl object-cover w-[550px]"
          />
        </CarouselItem>
        <CarouselItem>
          <ProductImage
            src={images[1]}
            alt={title}
            width={600}
            height={600}
            className="rounded-2xl object-cover w-[550px]"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselImage;
