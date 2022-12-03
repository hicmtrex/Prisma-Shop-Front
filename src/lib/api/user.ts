import { UserFullInfo } from '../../utils/types/user.type';
import authApi from './auth-api';
import publicApi from './products';

export const getUsersList = async (name: string): Promise<UserFullInfo[]> => {
  const { data } = await authApi.get(`/users?name=${name}`);
  return data;
};

export const getUserById = async (
  id: string | undefined
): Promise<UserFullInfo> => {
  const { data } = await publicApi.get(`/users/${id}`);
  return data;
};

export const deleteUser = async (id: string | undefined): Promise<string> => {
  return await authApi.delete(`/users/${id}`);
};

export const updateUser = async (user: any): Promise<string> => {
  return await authApi.put(`/users/${user.id}`, user);
};
