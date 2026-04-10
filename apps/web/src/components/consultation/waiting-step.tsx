'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { ConsultationResponse } from '@/types/consultation';

interface WaitingStepProps {
  consultation: ConsultationResponse;
  accessToken: string;
}

export function WaitingStep({ consultation, accessToken }: WaitingStepProps): JSX.Element {
  const router = useRouter();

  const checkStatus = useCallback(async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/consultations/by-token/${accessToken}`);
      if (res.ok) {
        const data: ConsultationResponse = await res.json();
        if (data.analysisStatus === 'DONE') {
          router.push(`/consultation/${accessToken}?step=3`);
        }
      }
    } catch {
      // Silently retry on next interval
    }
  }, [accessToken, router]);

  useEffect(() => {
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-6 relative">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>

      <h2 className="heading-md mb-3">요구사항을 분석 중입니다</h2>
      <p className="text-gray-500 mb-2">
        AI가 프로젝트 요구사항을 분석하고 있습니다.
      </p>
      <p className="text-gray-400 text-sm mb-8">
        분석이 완료되면 자동으로 다음 단계로 이동합니다.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto text-left">
        <h3 className="font-semibold text-gray-900 mb-3">제출한 프로젝트 정보</h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">프로젝트명:</span>
            <span className="ml-2 text-gray-700">{consultation.projectName}</span>
          </div>
          <div>
            <span className="text-gray-500">상태:</span>
            <span className="ml-2 badge badge-primary text-xs">
              {consultation.analysisStatus === 'PENDING' ? '분석 대기' :
               consultation.analysisStatus === 'PROCESSING' ? '분석 중' :
               consultation.analysisStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
