import { CartItems } from './types/cart.type';
import { ProductType } from './types/product.type';

const CURRENCRY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: 'USD',
  style: 'currency',
});

export const formatCurrencry = (number: number) => {
  return CURRENCRY_FORMATTER.format(number);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en');
};

export const getItemPrice = (item: ProductType) => {
  return item.price * item.qty;
};

export const getItemsPrice = (items: CartItems) => {
  return items.reduce((acc, item) => acc + item.price * item.qty, 0);
};

export const backendURL =
  import.meta.env.VITE_MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://type-shop.herokuapp.com';
