'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';

export function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">
          준비스튜디오
        </Link>

        <div className="hidden md:flex gap-6">
          <Link
            href="/#features"
            className="text-sm hover:text-primary transition-colors"
          >
            서비스 소개
          </Link>
          <Link
            href="/#process"
            className="text-sm hover:text-primary transition-colors"
          >
            프로세스
          </Link>
          {isAuthenticated && (
            <Link
              href="/dashboard"
              className="text-sm hover:text-primary transition-colors"
            >
              대시보드
            </Link>
          )}
        </div>

        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:inline">
                {user?.name}님
              </span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  로그인
                </Button>
              </Link>
              <Link href="/consultation">
                <Button size="sm">상담 신청</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
