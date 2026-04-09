'use client';

import { PortfolioForm } from '@/components/portfolio/portfolio-form';

export default function AdminPortfolioNewPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-900">포트폴리오 등록</h1>
        <p className="text-sm text-gray-500 mt-1">
          새 포트폴리오를 등록합니다. 등록 후 섹션을 추가할 수 있습니다.
        </p>
      </div>
      <PortfolioForm mode="create" />
    </div>
  );
}
