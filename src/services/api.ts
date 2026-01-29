import axios from "axios";
import { useAuthStore } from "../store/auth.store";
import { authService } from "../services/auth.service";


export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ ONLY THIS
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ✅ GET refreshToken from ZUSTAND
    const { refreshToken } = useAuthStore.getState();

    if (!refreshToken) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    const data = await authService.refreshToken(refreshToken);

    // ✅ update Zustand (this updates sessionStorage too)
    useAuthStore.getState().setAccessToken(data.accessToken);

    originalRequest.headers.Authorization =
      `Bearer ${data.accessToken}`;

    return api(originalRequest);
  }
);
