import { Address } from './address.model';
import { CartItem } from './cartItem.model';
import { user } from './user.model';

export interface Order {
  _id?: string;
  user: user;
  cart: string;
  address: Address;
  total: number;
  paid: boolean;
  status:string,
  products: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
