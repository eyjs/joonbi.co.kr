import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
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
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${API_URL}/api/auth/refresh`, {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Create a typed API wrapper that unwraps the response
export const api = {
  get: <T>(url: string, config?: any): Promise<T> => axiosInstance.get(url, config),
  post: <T>(url: string, data?: any, config?: any): Promise<T> => axiosInstance.post(url, data, config),
  put: <T>(url: string, data?: any, config?: any): Promise<T> => axiosInstance.put(url, data, config),
  patch: <T>(url: string, data?: any, config?: any): Promise<T> => axiosInstance.patch(url, data, config),
  delete: <T>(url: string, config?: any): Promise<T> => axiosInstance.delete(url, config),
};
