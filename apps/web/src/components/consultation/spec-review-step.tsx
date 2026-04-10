'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ConsultationResponse, AiFeature } from '@/types/consultation';

interface SpecReviewStepProps {
  consultation: ConsultationResponse;
  accessToken: string;
}

export function SpecReviewStep({ consultation, accessToken }: SpecReviewStepProps): JSX.Element {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const features = (consultation.aiFeatures || []) as AiFeature[];
  const totalMin = consultation.aiEstimatedMin;
  const totalMax = consultation.aiEstimatedMax;
  const estimatedDays = consultation.aiEstimatedDays;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/consultations/by-token/${accessToken}/confirm-spec`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerComment: comment || undefined }),
      });

      if (res.ok) {
        router.push(`/consultation/${accessToken}?step=4`);
      }
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="heading-md mb-2">분석 결과</h2>
        <p className="text-gray-500">AI가 분석한 프로젝트 명세를 확인해주세요.</p>
      </div>

      {/* Estimation summary */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 mb-1">예상 비용</div>
          <div className="text-lg font-bold text-gray-900">
            {totalMin && totalMax
              ? `${(totalMin / 10000).toLocaleString()} ~ ${(totalMax / 10000).toLocaleString()}만원`
              : '산정 중'}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 mb-1">예상 기간</div>
          <div className="text-lg font-bold text-gray-900">
            {estimatedDays ? `${estimatedDays}일` : '산정 중'}
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-sm text-blue-600 mb-1">실행 가능성</div>
          <div className="text-lg font-bold text-gray-900">
            {consultation.aiFeasibility === 'FEASIBLE' ? '가능'
              : consultation.aiFeasibility === 'CONDITIONAL' ? '조건부'
              : consultation.aiFeasibility === 'INFEASIBLE' ? '불가'
              : '판단 중'}
          </div>
        </div>
      </div>

      {/* Features list */}
      {features.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">기능 목록</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 divide-y divide-gray-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    feature.required ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {feature.required ? '필수' : '선택'}
                  </span>
                  <span className="text-sm text-gray-700">{feature.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {(feature.price / 10000).toLocaleString()}만원
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {consultation.aiRisks && consultation.aiRisks.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">주의 사항</h3>
          <ul className="space-y-2">
            {consultation.aiRisks.map((risk, index) => (
              <li key={index} className="flex gap-2 text-sm text-gray-600">
                <span className="text-yellow-500 flex-shrink-0">!</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comment */}
      <div className="space-y-2">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-900">
          코멘트 (선택)
        </label>
        <textarea
          id="comment"
          className="w-full min-h-[100px] px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
          placeholder="수정하고 싶은 사항이 있으면 적어주세요"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="btn-primary w-full py-3.5 text-base"
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? '확인 중...' : '명세서 확인 완료'}
      </button>
    </div>
  );
}
