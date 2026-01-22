import { api } from "./api";
import { authApi } from "./authApi";

interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },

  // ✅ FIXED: matches backend route
  profile: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },

 refreshToken: async (refreshToken: string) => {
  const res = await authApi.post("/auth/refresh-token", {
    refreshToken,
  });
  return res.data;
},

    signup: async (
    email: string,
    password: string,
    role: "ADMIN" | "MANAGER" | "EMPLOYEE"
  ) => {
    const res = await api.post("/auth/register", {
      email,
      password,
      role,
    });
    return res.data;
  },
};
