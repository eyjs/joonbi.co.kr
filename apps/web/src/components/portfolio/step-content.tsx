'use client';

import { forwardRef } from 'react';
import type { PortfolioSection, PortfolioSectionType } from '@/types/portfolio';
import { SectionRenderer } from './section-renderer';

interface StepDefinition {
  number: number;
  label: string;
  sectionTypes: PortfolioSectionType[];
}

interface StepContentProps {
  step: StepDefinition;
  sections: PortfolioSection[];
}

export const StepContent = forwardRef<HTMLDivElement, StepContentProps>(
  function StepContent({ step, sections }, ref) {
    return (
      <div ref={ref} data-step={step.number} className="scroll-mt-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-bold text-blue-600">
            {String(step.number).padStart(2, '0')}
          </span>
          <h2 className="heading-md">{step.label}</h2>
        </div>

        {sections.length > 0 ? (
          <div className="space-y-8">
            {sections.map((section) => (
              <SectionRenderer key={section.id} section={section} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm py-4">이 단계의 콘텐츠가 아직 없습니다.</p>
        )}
      </div>
    );
  }
);
