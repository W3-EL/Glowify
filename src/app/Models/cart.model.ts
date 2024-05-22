import { CartItem } from './cartItem.model';

export interface Cart {
  user: string;
  products: CartItem[];
  empty: boolean;
}