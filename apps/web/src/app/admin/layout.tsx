'use client';

import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/components/admin/auth-provider';
import { Sidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Login page: no layout wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen" style={{ backgroundColor: '#0f0f23' }}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main area with left offset for desktop sidebar */}
        <div className="lg:pl-64 flex flex-col min-h-screen">
          <AdminHeader onMenuToggle={() => setIsSidebarOpen((prev) => !prev)} />

          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
