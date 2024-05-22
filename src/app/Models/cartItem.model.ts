import { product } from './product.model';

export interface CartItem {
  product: product;
  quantity: number;
  totalProductPrice?: number; 
}