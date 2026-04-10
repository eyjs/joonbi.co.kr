'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SubmitInfoDto } from '@/types/consultation';

interface InfoCollectionStepProps {
  accessToken: string;
}

export function InfoCollectionStep({ accessToken }: InfoCollectionStepProps): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<SubmitInfoDto>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    companyName: '',
    businessNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/consultations/by-token/${accessToken}/submit-info`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          customerEmail: formData.customerEmail,
          customerPhone: formData.customerPhone,
          companyName: formData.companyName || undefined,
          businessNumber: formData.businessNumber || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || '정보 제출에 실패했습니다.');
      }

      router.push(`/consultation/${accessToken}?step=5`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('정보 제출에 실패했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof SubmitInfoDto, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="heading-md mb-2">연락처 정보</h2>
        <p className="text-gray-500">프로젝트 진행을 위한 연락처를 입력해주세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-900">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            id="customerName"
            type="text"
            placeholder="홍길동"
            value={formData.customerName}
            onChange={(e) => updateField('customerName', e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-900">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            id="customerEmail"
            type="email"
            placeholder="email@example.com"
            value={formData.customerEmail}
            onChange={(e) => updateField('customerEmail', e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-900">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <input
            id="customerPhone"
            type="tel"
            placeholder="010-1234-5678"
            value={formData.customerPhone}
            onChange={(e) => updateField('customerPhone', e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
            회사명 <span className="text-gray-400">(선택)</span>
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="회사명"
            value={formData.companyName}
            onChange={(e) => updateField('companyName', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-900">
            사업자등록번호 <span className="text-gray-400">(선택)</span>
          </label>
          <input
            id="businessNumber"
            type="text"
            placeholder="000-00-00000"
            value={formData.businessNumber}
            onChange={(e) => updateField('businessNumber', e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3.5 text-base"
          disabled={loading}
        >
          {loading ? '제출 중...' : '정보 제출'}
        </button>
      </form>
    </div>
  );
}
