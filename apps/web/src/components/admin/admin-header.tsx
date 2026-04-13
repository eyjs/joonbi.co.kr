'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps): JSX.Element {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = (): void => {
    clearAuth();
    router.push('/admin/login');
  };

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 lg:px-6 h-14 border-b border-gray-700/50"
      style={{ backgroundColor: '#2d2d44' }}
    >
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="메뉴 열기"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-white">
          준비스튜디오 <span className="text-gray-400 font-normal">Admin</span>
        </span>
      </div>

      {/* Right: user + logout */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-300 hidden sm:inline">
            {user.name}
          </span>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-gray-700/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
