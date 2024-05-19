import { Brand } from "./brand.model";
import { Category } from "./category.model";

export interface product {
  _id?: string; 
  product_name: string;
  desc_prod: string;
  price: number;
  stock: number;
  img:string;
  gender:string;
  category: Category;
  brand: Brand;
  createdAt?: Date; 
  updatedAt?: Date; 
}