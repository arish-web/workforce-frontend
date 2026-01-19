// import { useNavigate } from "react-router-dom";
// import { authService } from "../services/auth.service";
// import { useAuthStore } from "../store/auth.store";
// import { TOKEN_KEYS } from "../utils/constants";

// export function useAuth() {
//   const navigate = useNavigate();
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const logout = useAuthStore((s) => s.logout);

//   const login = async (email: string, password: string) => {
//     const data = await authService.login({ email, password });

//     localStorage.setItem(TOKEN_KEYS.ACCESS, data.accessToken);
//     localStorage.setItem(TOKEN_KEYS.REFRESH, data.refreshToken);

//     setAuth(data.user, data.user.role);

//     switch (data.user.role) {
//       case "ADMIN":
//         navigate("/admin");
//         break;
//       case "MANAGER":
//         navigate("/manager");
//         break;
//       case "EMPLOYEE":
//         navigate("/employee");
//         break;
//       default:
//         logout();
//     }
//   };

//   return { login, logout };
// }


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
    });

    // ✅ DO NOT throw
    // ✅ DO NOT swallow
    return data;
  };

  return { login };
};
