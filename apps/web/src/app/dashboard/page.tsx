'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      router.push(`/dashboard/${token.trim()}`);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="heading-lg mb-3">프로젝트 대시보드</h1>
            <p className="text-gray-500">
              알림톡에서 받은 링크로 접근하시거나,
              <br />
              아래에 프로젝트 코드를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="projectToken" className="block text-sm font-medium text-gray-900 mb-2">
                프로젝트 접근 코드
              </label>
              <input
                id="projectToken"
                type="text"
                placeholder="접근 코드를 입력해주세요"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full py-3">
              대시보드 접근
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
