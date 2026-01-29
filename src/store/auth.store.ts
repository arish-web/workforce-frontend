import { create } from "zustand";

interface AuthState {
  user: any | null;
  accessToken: string | null;
  refreshToken: string | null;

  login: (data: {
    user: any;
    accessToken: string;
    refreshToken?: string;
  }) => void;

  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: sessionStorage.getItem("accessToken"),
  refreshToken: sessionStorage.getItem("refreshToken"),

  login: ({ user, accessToken, refreshToken }) => {
    set((state) => {
      if (state.user) {
        return state;
      }

      sessionStorage.setItem("accessToken", accessToken);

      if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
      }

      return {
        user,
        accessToken,
        refreshToken: refreshToken ?? state.refreshToken,
      };
    });
  },

  setAccessToken: (token) => {
    sessionStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  logout: () => {
    sessionStorage.clear();
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
