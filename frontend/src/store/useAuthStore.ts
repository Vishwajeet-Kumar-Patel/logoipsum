import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'creator' | 'admin';
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (userData) => {
        localStorage.setItem('token', userData.token);
        set({ user: userData, token: userData.token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
        window.location.href = '/login';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
