import create from 'zustand';
import publicApi from '../lib/api/products';

type UserInfo = {
  username: string;
  email: string;
  role: string;
  id: string;
};

type AuthStore = {
  user?: UserInfo;
  getUserDetails: (id: string | undefined) => any;
};

const useUserStore = create<AuthStore>((set) => ({
  user: undefined,
  async getUserDetails(id: string | undefined) {
    const { data } = await publicApi.get(`/users/${id}`);
    set({ user: data });
  },
}));

export default useUserStore;
