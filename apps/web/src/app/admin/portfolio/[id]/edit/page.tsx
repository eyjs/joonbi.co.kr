'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';
import { PortfolioForm } from '@/components/portfolio/portfolio-form';
import type { Portfolio } from '@/types/portfolio';

export default function AdminPortfolioEditPage(): JSX.Element {
  const params = useParams();
  const id = params.id as string;

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolio(): Promise<void> {
      try {
        const result = await api.get<Portfolio>(`/api/admin/portfolios/${id}`);
        setPortfolio(result);
      } catch {
        setError('포트폴리오를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-sm">로딩 중...</p>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{error || '포트폴리오를 찾을 수 없습니다.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">포트폴리오 수정</h1>
        <p className="text-sm text-gray-400 mt-1">{portfolio.title}</p>
      </div>
      <PortfolioForm portfolio={portfolio} mode="edit" />
    </div>
  );
}
