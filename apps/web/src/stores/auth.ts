import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;

  setAuth: (accessToken: string, refreshToken: string, user: User, rememberMe?: boolean) => void;
  clearAuth: () => void;
}

/**
 * Read token from storage, checking localStorage first then sessionStorage.
 */
export function getStoredToken(key: 'accessToken' | 'refreshToken'): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key) || sessionStorage.getItem(key);
}

/**
 * Save token to the appropriate storage based on rememberMe.
 * If rememberMe is not specified, detect from existing storage location.
 */
function saveToken(key: string, value: string, rememberMe: boolean): void {
  if (rememberMe) {
    localStorage.setItem(key, value);
    sessionStorage.removeItem(key);
  } else {
    sessionStorage.setItem(key, value);
    localStorage.removeItem(key);
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (accessToken, refreshToken, user, rememberMe = true) => {
        saveToken('accessToken', accessToken, rememberMe);
        saveToken('refreshToken', refreshToken, rememberMe);
        set({ accessToken, refreshToken, user, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
