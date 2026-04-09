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
      // 인증 실패 시 api interceptor가 redirect 처리
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
      // 에러 발생 시 무시하지 않고 상태 유지
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await api.delete(`/api/admin/portfolios/${id}`);
      await fetchPortfolios();
    } catch {
      // 에러 발생 시 상태 유지
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">포트폴리오 관리</h1>
          <Link
            href="/admin/portfolio/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            새 포트폴리오 등록
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  제목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  카테고리
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  공개 유형
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  공개 여부
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                  섹션 수
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {portfolios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    등록된 포트폴리오가 없습니다.
                  </td>
                </tr>
              ) : (
                portfolios.map((portfolio) => (
                  <tr key={portfolio.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{portfolio.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">/{portfolio.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {portfolio.category || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {portfolio.displayType}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleTogglePublic(portfolio)}
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          portfolio.isPublic
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                        aria-label={portfolio.isPublic ? '비공개로 변경' : '공개로 변경'}
                      >
                        {portfolio.isPublic ? '공개' : '비공개'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">
                      {portfolio.sections?.length || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => router.push(`/admin/portfolio/${portfolio.id}/edit`)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(portfolio.id)}
                          className="text-sm text-red-600 hover:text-red-800 font-medium"
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
    </div>
  );
}
