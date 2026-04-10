'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import type { Portfolio, PortfolioSection, PortfolioSectionType } from '@/types/portfolio';
import { StepNavigation } from './step-navigation';
import { StepContent } from './step-content';
import { ImageGallery } from './image-gallery';

interface StepDefinition {
  number: number;
  label: string;
  sectionTypes: PortfolioSectionType[];
}

const STEP_DEFINITIONS: StepDefinition[] = [
  { number: 1, label: '과제', sectionTypes: ['OVERVIEW'] },
  { number: 2, label: '솔루션', sectionTypes: ['BRIEF'] },
  { number: 3, label: '결과', sectionTypes: ['VIDEO', 'IMAGES', 'DOCUMENT'] },
  { number: 4, label: '아키텍처', sectionTypes: ['DIAGRAM'] },
];

function groupSectionsByStep(sections: PortfolioSection[]): Map<number, PortfolioSection[]> {
  const sorted = [...sections].sort((a, b) => a.displayOrder - b.displayOrder);
  const map = new Map<number, PortfolioSection[]>();

  for (const section of sorted) {
    const step = STEP_DEFINITIONS.find((s) =>
      s.sectionTypes.includes(section.sectionType)
    );
    if (step) {
      const existing = map.get(step.number) || [];
      existing.push(section);
      map.set(step.number, existing);
    }
  }

  return map;
}

interface PortfolioDetailClientProps {
  portfolio: Portfolio;
}

export function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps): JSX.Element {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const sectionsByStep = groupSectionsByStep(portfolio.sections);
  const availableSteps = STEP_DEFINITIONS.filter((s) => sectionsByStep.has(s.number));

  const setStepRef = useCallback((stepNumber: number, el: HTMLDivElement | null) => {
    if (el) {
      stepRefs.current.set(stepNumber, el);
    } else {
      stepRefs.current.delete(stepNumber);
    }
  }, []);

  const handleStepClick = useCallback((stepNumber: number) => {
    const el = stepRefs.current.get(stepNumber);
    if (el) {
      const headerOffset = 128;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const stepNum = Number(entry.target.getAttribute('data-step'));
            if (stepNum) {
              setActiveStep(stepNum);
            }
          }
        }
      },
      { rootMargin: '-140px 0px -60% 0px', threshold: 0.1 }
    );

    for (const [, el] of stepRefs.current) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [availableSteps]);

  const completedDate = portfolio.completedAt
    ? new Date(portfolio.completedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <article className="pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header info */}
        <header className="pt-12 mb-8">
          {portfolio.category && (
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              {portfolio.category}
            </span>
          )}

          <h1 className="heading-lg mt-2">{portfolio.title}</h1>

          {portfolio.description && (
            <p className="text-gray-500 mt-4 text-lg">{portfolio.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            {completedDate && <span>완료: {completedDate}</span>}
            {portfolio.displayType === 'FULL' && portfolio.clientName && (
              <span>클라이언트: {portfolio.clientName}</span>
            )}
          </div>

          {portfolio.techStack && portfolio.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {portfolio.techStack.map((tech) => (
                <span key={tech} className="badge-primary text-xs px-3 py-1 rounded-full badge">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Thumbnail */}
        {portfolio.thumbnailUrl && (
          <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-gray-200">
            <img
              src={portfolio.thumbnailUrl}
              alt={portfolio.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Step Navigation Bar */}
        {availableSteps.length > 1 && (
          <StepNavigation
            steps={availableSteps}
            activeStep={activeStep}
            onStepClick={handleStepClick}
          />
        )}

        {/* Step Contents */}
        <div className="space-y-12 mt-8">
          {availableSteps.map((step) => (
            <StepContent
              key={step.number}
              step={step}
              sections={sectionsByStep.get(step.number) || []}
              ref={(el) => setStepRef(step.number, el)}
            />
          ))}
        </div>

        {/* Legacy images */}
        {portfolio.images && portfolio.images.length > 0 && (
          <div className="mt-12">
            <h2 className="heading-sm mb-4">스크린샷</h2>
            <ImageGallery images={portfolio.images} />
          </div>
        )}
      </div>
    </article>
  );
}
