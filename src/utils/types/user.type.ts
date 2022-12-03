import { OrderType } from './order.type';

export type UserBasicInfo = {
  id?: string;
  username: string;
  email: string;
};

export type UserFullInfo = {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: Date;
  Order: OrderType[];
};
