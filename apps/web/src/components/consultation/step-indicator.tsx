'use client';

import type { ConsultationStep } from '@/types/consultation';

interface StepInfo {
  number: ConsultationStep;
  label: string;
}

const STEPS: StepInfo[] = [
  { number: 1, label: '폼 제출' },
  { number: 2, label: '분석 대기' },
  { number: 3, label: '명세 확인' },
  { number: 4, label: '정보 수집' },
  { number: 5, label: '다이어그램' },
  { number: 6, label: '결제' },
];

interface StepIndicatorProps {
  currentStep: ConsultationStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps): JSX.Element {
  return (
    <nav className="mb-8" aria-label="상담 진행 단계">
      <ol className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <li key={step.number} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isCompleted
                      ? 'bg-blue-600 text-white'
                      : isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs mt-1.5 hidden sm:block ${
                    isCurrent ? 'text-blue-600 font-medium' : isUpcoming ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
