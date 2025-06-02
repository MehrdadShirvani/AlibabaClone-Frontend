import { AuthResponseDto } from '@/shared/models/authentication/AuthResponseDto';
import {create} from 'zustand';

interface User {
  phoneNumber: string;
  roles: any;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;

  login: (response: AuthResponseDto) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (response) =>
  set(() => ({
    token: response.token,
    user: {
      phoneNumber: response.phoneNumber,
      roles: response.roles
      // You can extend this if you add roles or IDs
    },
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
