"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </CarouselItem>
        <CarouselItem>
          <ProductImage
            src={images[1]}
            alt={title}
            width={1000}
            height={1000}
            className="rounded-xl object-cover"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="absolute left-2" />
      <CarouselNext className="absolute right-2" />
    </Carousel>
  );
};

export default CarouselImage;
