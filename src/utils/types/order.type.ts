import { CartItems } from './cart.type';
import { UserFullInfo } from './user.type';

export type ShippingAddressTypes = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderType = {
  id: string;
  shippingAddress: ShippingAddressTypes;
  cartItems: any[];
  userId: string;
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
};

export type AdminOrderType = {
  id: string;
  shippingAddress: ShippingAddressTypes;
  cartItems: CartItems;
  user: UserFullInfo;
  totalPrice: number;
  isPaid: boolean;
  createdAt: Date;
};
