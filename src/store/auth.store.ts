import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthLoading: boolean;
  login: (data: { user: User; accessToken: string }) => void;
  setAuthLoading: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: sessionStorage.getItem("accessToken"),
  isAuthLoading: true,

  login: (data) =>
    set(() => {
      sessionStorage.setItem("accessToken", data.accessToken);
      return {
        user: data.user,
        accessToken: data.accessToken,
        isAuthLoading: false,
      };
    }),

  setAuthLoading: (value) => set({ isAuthLoading: value }),

  logout: () =>
    set(() => {
      sessionStorage.removeItem("accessToken");
      return {
        user: null,
        accessToken: null,
        isAuthLoading: false,
      };
    }),
}));
