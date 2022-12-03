export type ProductType = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  countInStock: string;
  qty: number;
  createdAt: Date;
};

export type CreateProductValues = {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  brand: string;
};

export type UpdateProductType = {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  brand: string;
} & { id?: string };
