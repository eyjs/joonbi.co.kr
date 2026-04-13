'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Portfolio, PortfolioListResponse } from '@/types/portfolio';

export default function AdminPortfolioListPage(): JSX.Element {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolios = useCallback(async (): Promise<void> => {
    try {
      const result = await api.get<PortfolioListResponse>('/api/admin/portfolios?page=1&limit=100');
      setPortfolios(result.data);
    } catch {
      // AuthProvider handles redirect on 401
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  const handleTogglePublic = async (portfolio: Portfolio): Promise<void> => {
    try {
      await api.patch(`/api/admin/portfolios/${portfolio.id}`, {
        isPublic: !portfolio.isPublic,
      });
      await fetchPortfolios();
    } catch {
      // keep current state on error
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/admin/portfolios/${id}`);
      await fetchPortfolios();
    } catch {
      // keep current state on error
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">포트폴리오 관리</h1>
        <Link
          href="/admin/portfolio/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          새 포트폴리오 등록
        </Link>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                제목
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase hidden md:table-cell">
                카테고리
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase hidden md:table-cell">
                공개 유형
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase">
                공개 여부
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase hidden sm:table-cell">
                섹션 수
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">
                작업
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {portfolios.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  등록된 포트폴리오가 없습니다.
                </td>
              </tr>
            ) : (
              portfolios.map((portfolio) => (
                <tr key={portfolio.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{portfolio.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">/{portfolio.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                    {portfolio.category || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                    {portfolio.displayType}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleTogglePublic(portfolio)}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        portfolio.isPublic
                          ? 'bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30'
                          : 'bg-gray-600/30 text-gray-400 border border-gray-600 hover:bg-gray-600/50'
                      }`}
                      aria-label={portfolio.isPublic ? '비공개로 변경' : '공개로 변경'}
                    >
                      {portfolio.isPublic ? '공개' : '비공개'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400 hidden sm:table-cell">
                    {portfolio.sections?.length || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => router.push(`/admin/portfolio/${portfolio.id}/edit`)}
                        className="text-sm text-blue-400 hover:text-blue-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded px-1"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(portfolio.id)}
                        className="text-sm text-red-400 hover:text-red-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded px-1"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
