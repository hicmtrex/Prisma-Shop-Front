import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export const authorizationProvider = (token: string) => {
  authApi.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export default authApi;
