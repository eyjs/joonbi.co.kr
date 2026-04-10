'use client';

import { useState } from 'react';
import type { ConsultationResponse } from '@/types/consultation';

interface PaymentStepProps {
  consultation: ConsultationResponse;
}

export function PaymentStep({ consultation }: PaymentStepProps): JSX.Element {
  const [isComplete, setIsComplete] = useState(false);

  const totalMin = consultation.aiEstimatedMin;
  const totalMax = consultation.aiEstimatedMax;

  if (isComplete) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="heading-md mb-3">상담이 완료되었습니다</h2>
        <p className="text-gray-500 mb-2">담당자가 확인 후 연락드리겠습니다.</p>
        <p className="text-gray-400 text-sm">이메일 또는 전화로 안내드릴 예정입니다.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="heading-md mb-2">결제</h2>
        <p className="text-gray-500">프로젝트 착수를 위한 계약금을 결제합니다.</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">결제 정보</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">프로젝트명</span>
            <span className="text-gray-700 font-medium">{consultation.projectName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">예상 총 비용</span>
            <span className="text-gray-700 font-medium">
              {totalMin && totalMax
                ? `${(totalMin / 10000).toLocaleString()} ~ ${(totalMax / 10000).toLocaleString()}만원`
                : '추후 협의'}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-medium text-gray-900">계약금 (30%)</span>
            <span className="font-bold text-blue-600 text-lg">
              {totalMin ? `${((totalMin * 0.3) / 10000).toLocaleString()}만원` : '추후 협의'}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          결제 기능은 현재 준비 중입니다. 아래 버튼을 클릭하면 상담 완료 처리됩니다.
        </p>
      </div>

      <button
        type="button"
        className="btn-primary w-full py-3.5 text-base"
        onClick={() => setIsComplete(true)}
      >
        상담 완료 (결제 기능 준비 중)
      </button>
    </div>
  );
}
