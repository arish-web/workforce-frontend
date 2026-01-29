import { api } from "./api";
import { authApi } from "./authApi";

interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  // 🔓 Public
  login: async (payload: LoginPayload) => {
    const res = await authApi.post("/auth/login", payload);
    return res.data;
  },

  signup: async (
    email: string,
    password: string,
    role: "ADMIN" | "MANAGER" | "EMPLOYEE"
  ) => {
    const res = await authApi.post("/auth/register", {
      email,
      password,
      role,
    });
    return res.data;
  },

  // 🔐 Protected
  profile: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },

  // ♻️ Refresh (SPECIAL CASE)
  refreshToken: async (refreshToken: string) => {
    const res = await authApi.post("/auth/refresh-token", {
      refreshToken,
    });
    return res.data;
  },
};
