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
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <ProductImage
                src={image}
                alt={title}
                width={600}
                height={600}
                className="rounded-2xl object-cover w-[550px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="pt-2 flex gap-2">
        <ProductImage
          src={images[0]}
          alt={title}
          width={100}
          height={100}
          className="rounded-2xl object-cover hover:border cursor-pointer"
        />
        <ProductImage
          src={images[1]}
          alt={title}
          width={100}
          height={100}
          className="rounded-2xl object-cover hover:border cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CarouselImage;
