export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  gender: Category;
}

export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}

export type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Types =
  | "shirts"
  | "pants"
  | "hoodies"
  | "hats"
  | "shoes"
  | "accessories"
  | "jackets";