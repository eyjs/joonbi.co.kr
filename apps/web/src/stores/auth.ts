import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;

  setAuth: (accessToken: string, refreshToken: string, user: User, rememberMe?: boolean) => void;
  clearAuth: () => void;
  setHasHydrated: (value: boolean) => void;
}

/**
 * Detect which storage currently holds the refresh token.
 * Returns true if localStorage has it, false otherwise.
 */
function isRemembered(): boolean {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem('refreshToken') !== null;
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

/**
 * Clear tokens from both storages.
 */
function clearTokens(): void {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
}

/**
 * Custom storage adapter for Zustand persist.
 *
 * Instead of storing everything under a single 'auth-storage' key,
 * this adapter reads/writes tokens from the same keys that saveToken uses.
 * This eliminates the dual-storage problem where persist and saveToken
 * would write to different keys, causing state desync on back-navigation.
 */
function createAuthStorage() {
  return createJSONStorage(() => ({
    getItem(name: string): string | null {
      if (typeof window === 'undefined') return null;

      if (name === 'auth-storage') {
        const accessToken = getStoredToken('accessToken');
        const refreshToken = getStoredToken('refreshToken');
        const userJson = localStorage.getItem('auth-user') || sessionStorage.getItem('auth-user');

        if (!accessToken || !refreshToken) return null;

        let user: User | null = null;
        try {
          user = userJson ? JSON.parse(userJson) : null;
        } catch {
          user = null;
        }

        const state: Pick<AuthState, 'user' | 'accessToken' | 'refreshToken' | 'isAuthenticated'> = {
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        };

        return JSON.stringify({ state, version: 0 });
      }

      return localStorage.getItem(name);
    },

    setItem(name: string, value: string): void {
      if (typeof window === 'undefined') return;

      if (name === 'auth-storage') {
        // Tokens are saved by saveToken in setAuth, so we only persist the user object here.
        try {
          const parsed = JSON.parse(value);
          const user = parsed?.state?.user;
          if (user) {
            const remember = isRemembered();
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem('auth-user', JSON.stringify(user));
          }
        } catch {
          // Ignore serialization errors
        }
        return;
      }

      localStorage.setItem(name, value);
    },

    removeItem(name: string): void {
      if (typeof window === 'undefined') return;

      if (name === 'auth-storage') {
        clearTokens();
        localStorage.removeItem('auth-user');
        sessionStorage.removeItem('auth-user');
        return;
      }

      localStorage.removeItem(name);
    },
  }));
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasHydrated: false,

      setAuth: (accessToken, refreshToken, user, rememberMe = true) => {
        saveToken('accessToken', accessToken, rememberMe);
        saveToken('refreshToken', refreshToken, rememberMe);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('auth-user', JSON.stringify(user));

        set({ accessToken, refreshToken, user, isAuthenticated: true });
      },

      clearAuth: () => {
        clearTokens();
        localStorage.removeItem('auth-user');
        sessionStorage.removeItem('auth-user');
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: 'auth-storage',
      storage: createAuthStorage(),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
