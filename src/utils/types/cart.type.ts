import { ProductType } from './product.type';

export type CartItems = ProductType[];

export type AddressType = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
