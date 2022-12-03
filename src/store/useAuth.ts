import create from 'zustand';
import publicApi from '../lib/api/products';
import { setError } from '../utils/error';
import { customToast } from '../utils/toast';

type UserLoginData = {
  email: string;
  password: string;
};

type UserRegisterData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type UserInfo = {
  username: string;
  email: string;
  role: string;
  id: string;
};

type AuthStore = {
  user?: UserInfo;
  loading?: boolean;
  token?: string;
  error?: any;
  userLogin: (user: UserLoginData) => any;
  userRegister: (user: UserRegisterData) => any;
  refreshToken: () => any;
  userLogout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: undefined,
  token: undefined,
  loading: undefined,
  error: undefined,
  async userLogin(user) {
    try {
      set({ loading: true });
      const { data } = await publicApi.post('/auth/login', user);
      set({ user: data.user, token: data.token, loading: false });
    } catch (err) {
      const errorMessage = setError(err);
      customToast('error', errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },
  async refreshToken() {
    try {
      set({ loading: true });
      const { data } = await publicApi.get('/auth');
      set({ user: data.user, token: data.token, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
  async userRegister(user) {
    try {
      set({ loading: true });
      const { data } = await publicApi.post('/auth', user);
      set({ user: data.user, token: data.token, loading: false });
    } catch (err) {
      const errorMessage = setError(err);
      customToast('error', errorMessage);
      set({ error: errorMessage, loading: false });
    }
  },
  async userLogout() {
    await publicApi.post('/auth/logout');
    set({ user: undefined, token: undefined });
  },
}));

export default useAuthStore;
