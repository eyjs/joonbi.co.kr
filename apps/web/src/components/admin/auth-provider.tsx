'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { api } from '@/lib/api';
import type { AuthResponse } from '@/types/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element | null {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAuth(): Promise<void> {
      if (isAuthenticated) {
        setIsChecking(false);
        return;
      }

      const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken');

      if (!refreshToken) {
        router.replace('/admin/login');
        return;
      }

      try {
        const response = await api.post<AuthResponse>('/api/auth/refresh', {
          refreshToken,
        });

        const isRemembered = localStorage.getItem('refreshToken') !== null;
        setAuth(
          response.accessToken,
          response.refreshToken,
          response.user,
          isRemembered,
        );
        setIsChecking(false);
      } catch {
        router.replace('/admin/login');
      }
    }

    checkAuth();
  }, [isAuthenticated, router, setAuth]);

  if (isChecking && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0f0f23' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-sm text-gray-400">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
