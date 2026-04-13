import axios from 'axios';
import { getStoredToken } from '@/stores/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getStoredToken('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getStoredToken('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;

        // Save new access token to the same storage that held the refresh token
        const isInLocalStorage = localStorage.getItem('refreshToken') !== null;
        if (isInLocalStorage) {
          localStorage.setItem('accessToken', accessToken);
        } else {
          sessionStorage.setItem('accessToken', accessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        window.location.href = '/admin/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, config?: Record<string, unknown>): Promise<T> =>
    axiosInstance.get(url, config),
  post: <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> =>
    axiosInstance.post(url, data, config),
  put: <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> =>
    axiosInstance.put(url, data, config),
  patch: <T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> =>
    axiosInstance.patch(url, data, config),
  delete: <T>(url: string, config?: Record<string, unknown>): Promise<T> =>
    axiosInstance.delete(url, config),
};
