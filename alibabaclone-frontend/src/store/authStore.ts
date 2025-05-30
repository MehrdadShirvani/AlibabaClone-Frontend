import {create} from 'zustand';

interface User {
  phoneNumber: string;
  // Add more fields like roles or ID if needed
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;

  login: (token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (token) =>
    set(() => ({
      token,
      isLoggedIn: true,
    })),

  logout: () =>
    set(() => ({
      token: null,
      user: null,
      isLoggedIn: false,
    })),

  setToken: (token) =>
    set((state) => ({
      token,
      isLoggedIn: !!token,
      user: state.user,
    })),
}));
