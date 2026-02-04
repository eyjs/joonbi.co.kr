'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = (): void => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  const navItems = [
    { href: '/admin', label: '대시보드', icon: '📊' },
    { href: '/admin/consultations', label: '상담 관리', icon: '💬' },
    { href: '/admin/projects', label: '프로젝트 관리', icon: '📁' },
    { href: '/admin/users', label: '사용자 관리', icon: '👥' },
    { href: '/admin/portfolios', label: '포트폴리오 관리', icon: '🎨' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 tech-border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen tech-bg flex">
      <aside className="w-64 tech-bg-secondary border-r tech-border flex flex-col">
        <div className="p-6 border-b tech-border">
          <h1 className="tech-heading text-xl font-bold">준비스튜디오</h1>
          <p className="tech-text-secondary text-sm mt-1">관리자 페이지</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'tech-gradient text-white'
                    : 'tech-text-secondary hover:tech-bg hover:tech-text'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t tech-border">
          <button
            onClick={handleLogout}
            className="w-full tech-btn-secondary py-2"
          >
            로그아웃
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
