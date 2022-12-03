import create from 'zustand';
import { AddressType, CartItems } from '../utils/types/cart.type';
import { persist } from 'zustand/middleware';
import { ProductType } from '../utils/types/product.type';

type CartStoreTypes = {
  totalPrice: number;
  shippingAddress?: AddressType;
  cartItems: CartItems;
  addToCart: (product: ProductType) => any;
  removeFromCart: (product: ProductType) => any;
  deleteFromCart: (product: ProductType) => any;
  setAddress: (address: AddressType) => any;
  resetCart: () => void;
};

const useCartStore = create<CartStoreTypes, any>(
  persist(
    (set) => ({
      totalPrice: 0,
      cartItems: [],
      shippingAddress: undefined,
      setAddress: (address: AddressType) => {
        set({ shippingAddress: address });
      },
      addToCart: (product: ProductType) => {
        set((state) => {
          const exist = state.cartItems.find((item) => item.id === product.id);
          if (exist) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...exist, qty: item.qty && item.qty + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, qty: 1 }],
            };
          }
        });
      },
      removeFromCart: (product: ProductType) => {
        set((state: any) => {
          const exist = state.cartItems.find(
            (item: ProductType) => item.id === product.id
          );

          if (exist && exist.qty === 1) {
            return {
              cartItems: state.cartItems.filter(
                (item: { id: string }) => item.id !== product.id
              ),
            };
          } else {
            return {
              cartItems: state.cartItems.map(
                (item: { id: string; qty: number }) =>
                  item.id === product.id
                    ? { ...exist, qty: item.qty && item.qty - 1 }
                    : item
              ),
            };
          }
        });
      },
      deleteFromCart: (product: ProductType) => {
        set((state) => {
          return {
            cartItems: state.cartItems.filter((item) => item.id !== product.id),
          };
        });
      },
      resetCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: 'food-storage', // name of item in the storage (must be unique)
      getStorage: () => sessionStorage, // (optional) by default the 'localStorage' is used
    }
  )
);

export default useCartStore;
