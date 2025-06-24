import { AuthResponseDto } from '@/shared/models/authentication/AuthResponseDto';
import {create} from 'zustand';

interface User {
  phoneNumber: string;
  roles: string[];
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  showLoginModal: boolean,
  setShowLoginModal: (value: boolean) => void,
  login: (response: AuthResponseDto) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,
  showLoginModal:false,
  setShowLoginModal: (value) => set(() =>({
    showLoginModal : value
  })), 
  login: (response) =>
  set(() => ({
    token: response.token,
    user: {
      phoneNumber: response.phoneNumber,
      roles: response.roles
    },
    isLoggedIn: true,
  })),
  logout: () =>
    set(() => ({
      token: null,
      user: null,
      isLoggedIn: false,
    })),
}));