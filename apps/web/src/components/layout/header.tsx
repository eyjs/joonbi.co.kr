'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm border-b z-50" style={{
      background: 'rgba(10, 14, 39, 0.9)',
      borderColor: 'var(--tech-border)'
    }}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tech-glow-text">
          준비스튜디오
        </Link>

        <div className="hidden md:flex gap-6">
          <Link
            href="/#features"
            className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
          >
            서비스 소개
          </Link>
          <Link
            href="/#process"
            className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
          >
            프로세스
          </Link>
          {isAuthenticated && (
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-300 hover:text-cyan-400 transition-colors"
            >
              대시보드
            </Link>
          )}
        </div>

        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-400 hidden md:inline">
                {user?.name}님
              </span>
              <button
                className="text-sm px-3 py-1.5 text-gray-300 hover:text-cyan-400 transition-colors"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/consultation">
              <button className="tech-btn-primary text-sm px-4 py-2">상담 신청</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
