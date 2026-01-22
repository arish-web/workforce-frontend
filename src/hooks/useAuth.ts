import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export const useAuth = () => {
  const loginStore = useAuthStore((state) => state.login);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });

    // IMPORTANT: store only what your store expects
    loginStore({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    // ✅ DO NOT throw
    // ✅ DO NOT swallow
    return data;
  };

    const signup = async (
    email: string,
    password: string,
    role: "ADMIN" | "MANAGER" | "EMPLOYEE"
  ) => {
    return authService.signup(email, password, role);
  };

  return { login, signup };
};
