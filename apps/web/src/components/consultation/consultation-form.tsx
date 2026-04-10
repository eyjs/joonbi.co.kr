'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CreatePublicConsultationDto, ConsultationResponse } from '@/types/consultation';

export function ConsultationForm(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<CreatePublicConsultationDto>({
    description: '',
    referenceUrls: [],
    budgetRange: '',
  });
  const [referenceUrlInput, setReferenceUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const referenceUrls = referenceUrlInput
        .split(',')
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/consultations/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: formData.description,
          referenceUrls: referenceUrls.length > 0 ? referenceUrls : undefined,
          budgetRange: formData.budgetRange || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || '상담 신청에 실패했습니다.');
      }

      const consultation: ConsultationResponse = await res.json();
      router.push(`/consultation/${consultation.accessToken}?step=2`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('상담 신청에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            프로젝트 설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            className="w-full min-h-[160px] px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
            placeholder="어떤 프로젝트를 구상하고 계신가요? 목적, 주요 기능, 일정 등을 자유롭게 작성해주세요. (최소 50자)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            minLength={50}
          />
          <p className="text-xs text-gray-400">
            {formData.description.length}/50자 (최소)
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="referenceUrls" className="block text-sm font-medium text-gray-900">
            참고 사이트 URL
          </label>
          <input
            id="referenceUrls"
            type="text"
            placeholder="https://example.com (여러 개는 쉼표로 구분)"
            value={referenceUrlInput}
            onChange={(e) => setReferenceUrlInput(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="budgetRange" className="block text-sm font-medium text-gray-900">
            예산 범위
          </label>
          <select
            id="budgetRange"
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
          >
            <option value="">선택해주세요</option>
            <option value="300만원 이하">300만원 이하</option>
            <option value="300-500만원">300-500만원</option>
            <option value="500-1000만원">500-1000만원</option>
            <option value="1000만원 이상">1000만원 이상</option>
            <option value="협의 가능">협의 가능</option>
          </select>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-800 font-medium mb-1">상담 진행 안내</p>
          <ul className="text-sm text-blue-600 space-y-1">
            <li>1. 프로젝트 설명을 제출합니다</li>
            <li>2. AI가 요구사항을 분석합니다</li>
            <li>3. 명세서와 견적을 확인합니다</li>
            <li>4. 세부 정보를 입력하여 계약을 진행합니다</li>
          </ul>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3.5 text-base"
          disabled={loading}
        >
          {loading ? '신청 중...' : '상담 시작하기'}
        </button>
      </form>
    </div>
  );
}
