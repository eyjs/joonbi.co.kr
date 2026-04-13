'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Portfolio } from '@/types/portfolio';
import { ReportLayout } from '@/components/portfolio/report-layout';

export default function PortfolioReportPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(`${apiUrl}/api/portfolios/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data: Portfolio) => setPortfolio(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400">보고서를 불러오는 중...</p>
      </main>
    );
  }

  if (error || !portfolio) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">포트폴리오를 찾을 수 없습니다.</p>
      </main>
    );
  }

  return (
    <>
      {/* Controls (hidden when printing) */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a
            href={`/portfolio/${slug}`}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            &larr; 상세 페이지로 돌아가기
          </a>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            PDF 다운로드
          </button>
        </div>
      </div>

      <ReportLayout portfolio={portfolio} />
    </>
  );
}
