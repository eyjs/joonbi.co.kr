'use client';

import { useRef, useEffect } from 'react';
import type { PortfolioSectionType } from '@/types/portfolio';

interface StepDefinition {
  number: number;
  label: string;
  sectionTypes: PortfolioSectionType[];
}

interface StepNavigationProps {
  steps: StepDefinition[];
  activeStep: number;
  onStepClick: (stepNumber: number) => void;
}

export function StepNavigation({ steps, activeStep, onStepClick }: StepNavigationProps): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeEl = activeRef.current;
      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeStep]);

  return (
    <nav
      className="sticky top-16 z-30 bg-white border-b border-gray-200 -mx-4 px-4"
      aria-label="포트폴리오 스텝 네비게이션"
    >
      <div
        ref={scrollRef}
        className="max-w-4xl mx-auto flex gap-0 overflow-x-auto scrollbar-hide"
      >
        {steps.map((step, index) => {
          const isActive = activeStep === step.number;

          return (
            <button
              key={step.number}
              ref={isActive ? activeRef : undefined}
              type="button"
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => onStepClick(step.number)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className={`text-xs font-bold ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>
                {String(step.number).padStart(2, '0')}
              </span>
              <span>{step.label}</span>
              {index < steps.length - 1 && (
                <svg
                  className="w-4 h-4 text-gray-300 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
