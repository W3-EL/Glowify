import { Brand } from "./brand.model";

export interface product {
  product_name: string;
  desc_prod: string;
  price: number;
  stock: number;
  category?: string;
  brand: Brand;
}