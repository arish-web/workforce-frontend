import { api } from "./api";

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

  // optional / future use
  refreshToken: async (refreshToken: string) => {
    const res = await api.post("/auth/refresh-token", { refreshToken });
    return res.data;
  },
};
