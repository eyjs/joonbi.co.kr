'use client';

import { useRouter } from 'next/navigation';

interface DiagramStepProps {
  accessToken: string;
}

export function DiagramStep({ accessToken }: DiagramStepProps): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8">
        <h2 className="heading-md mb-2">프로젝트 구조도</h2>
        <p className="text-gray-500">초기 시퀀스 다이어그램과 플로우차트를 확인하세요.</p>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
        <p className="text-gray-500 mb-2">다이어그램이 준비되면 이곳에 표시됩니다.</p>
        <p className="text-gray-400 text-sm">관리자가 분석 결과를 기반으로 다이어그램을 생성합니다.</p>
      </div>

      <button
        type="button"
        className="btn-primary w-full py-3.5 text-base mt-8"
        onClick={() => router.push(`/consultation/${accessToken}?step=6`)}
      >
        다음 단계로
      </button>
    </div>
  );
}
