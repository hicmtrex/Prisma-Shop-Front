import axios from 'axios';
import {
  CreateProductValues,
  ProductType,
  UpdateProductType,
} from '../../utils/types/product.type';
import authApi from './auth-api';

const publicApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export type FilterProducts = {
  products: ProductType[];
  categories: string[];
  brands: string[];
};

export type Filter = {
  name: string;
  brand: string;
  category: string;
};

export const filterProducts = async (
  filter: Filter
): Promise<FilterProducts> => {
  const { data } = await publicApi.get(
    `/products?name=${filter.name}&category=${filter.category}&brand=${filter.brand}`
  );
  return data;
};

export const getProducts = async (): Promise<FilterProducts> => {
  const { data } = await publicApi.get('/products');
  return data;
};

export const deleteProduct = async (id?: string) => {
  return await authApi.delete(`/products/${id}`);
};

export const updateProduct = async (product: UpdateProductType) => {
  return await authApi.put(`/products/${product.id}`, product);
};

export const getProductById = async (id?: string): Promise<ProductType> => {
  const { data } = await publicApi.get(`/products/${id}`);
  return data;
};

export const createProduct = async (todo: CreateProductValues) => {
  return await authApi.post('/products', todo);
};

export default publicApi;
