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
    sessionStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
      sessionStorage.setItem("refreshToken", refreshToken);
    }

    set({
      user,
      accessToken,
      refreshToken: refreshToken || null,
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
