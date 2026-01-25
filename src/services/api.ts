import axios from "axios";
// import { useAuthStore } from "../store/auth.store";
// import { authService } from "../services/auth.service";

export const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/refresh-token",
        { refreshToken }
      );

      const newAccessToken = res.data.accessToken;
      sessionStorage.setItem("accessToken", newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);



