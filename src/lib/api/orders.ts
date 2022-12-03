import { AdminOrderType } from '../../utils/types/order.type';
import authApi from './auth-api';

export const getOrdersList = async (): Promise<AdminOrderType[]> => {
  const { data } = await authApi.get(`/orders`);
  return data;
};

export const getOrderBydId = async (id?: string): Promise<AdminOrderType> => {
  const { data } = await authApi.get(`/orders/${id}`);
  return data;
};

export const deleteOrder = async (id?: string): Promise<void> => {
  return await authApi.delete(`/orders/${id}`);
};

export const createOrder = async (order: any) => {
  const { data } = await authApi.post(`/orders`, order);
  return data;
};

export const orderPayment = async (payment: {
  id: string;
  amount?: number;
}) => {
  const { data } = await authApi.post('/orders/stripe', payment);
  return data;
};
