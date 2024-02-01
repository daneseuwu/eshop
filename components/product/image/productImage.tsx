import Image from "next/image";
interface Props {
  src: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  width: number;
  height: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
const ProductImage = ({ src, alt, className, width, height }: Props) => {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : `/landscape-placeholder-svgrepo-com.svg`;

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}
      priority
      className={className}
    />
  );
};

export default ProductImage;
