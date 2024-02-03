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
            width={600}
            height={600}
            className="rounded-2xl object-cover w-[500px]"
          />
        </CarouselItem>
        <CarouselItem>
          <ProductImage
            src={images[1]}
            alt={title}
            width={600}
            height={600}
            className="rounded-2xl object-cover w-[500px]"
          />
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious  />
      <CarouselNext  /> */}
    </Carousel>
  )
}

export default CarouselImage;
