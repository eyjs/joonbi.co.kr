'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import type { Portfolio, PortfolioSection, PortfolioSectionType } from '@/types/portfolio';
import { StepNavigation } from './step-navigation';
import { SectionRenderer } from './section-renderer';
import { ImageGallery } from './image-gallery';
import { ProjectHero } from './project-hero';
import { BeforeAfter } from './before-after';
import { Timeline } from './timeline';

interface StepDefinition {
  number: number;
  label: string;
  sectionTypes: PortfolioSectionType[];
}

const DEFAULT_STEP_LABELS = ['과제', '솔루션', '결과', '아키텍처'];

function buildStepsFromSections(
  portfolio: Portfolio,
  sections: PortfolioSection[],
): { steps: StepDefinition[]; sectionsByStep: Map<number, PortfolioSection[]> } {
  const sorted = [...sections].sort((a, b) => a.displayOrder - b.displayOrder);
  const sectionsByStep = new Map<number, PortfolioSection[]>();

  // 섹션의 title로 스텝 라벨을 결정, 같은 title은 같은 스텝으로 묶음
  const titleToStep = new Map<string, number>();
  let stepCounter = 0;

  for (const section of sorted) {
    const title = section.title || `섹션 ${section.displayOrder}`;
    let stepNum = titleToStep.get(title);

    if (stepNum === undefined) {
      stepCounter++;
      stepNum = stepCounter;
      titleToStep.set(title, stepNum);
    }

    const existing = sectionsByStep.get(stepNum) || [];
    existing.push(section);
    sectionsByStep.set(stepNum, existing);
  }

  // Before/After 데이터가 있으면 맨 앞에 스텝 추가
  const hasPortfolioBA =
    portfolio.beforeItems &&
    portfolio.beforeItems.length > 0 &&
    portfolio.afterItems &&
    portfolio.afterItems.length > 0;

  const steps: StepDefinition[] = [];

  if (hasPortfolioBA) {
    // 모든 기존 스텝 번호를 +1 shift
    const shifted = new Map<number, PortfolioSection[]>();
    for (const [num, secs] of sectionsByStep) {
      shifted.set(num + 1, secs);
    }
    sectionsByStep.clear();
    for (const [num, secs] of shifted) {
      sectionsByStep.set(num, secs);
    }

    steps.push({ number: 1, label: 'Before/After', sectionTypes: [] });

    for (const [title, _origNum] of titleToStep) {
      const newNum = _origNum + 1;
      steps.push({ number: newNum, label: title, sectionTypes: [] });
    }
  } else {
    for (const [title, num] of titleToStep) {
      steps.push({ number: num, label: title, sectionTypes: [] });
    }
  }

  steps.sort((a, b) => a.number - b.number);
  return { steps, sectionsByStep };
}

interface PortfolioDetailClientProps {
  portfolio: Portfolio;
}

export function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps): JSX.Element {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const { steps: availableSteps, sectionsByStep } = buildStepsFromSections(
    portfolio,
    portfolio.sections,
  );

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

  return (
    <article className="pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Project Hero (fixed above steps) */}
        <ProjectHero portfolio={portfolio} />

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
            <div
              key={step.number}
              ref={(el) => setStepRef(step.number, el)}
              data-step={step.number}
              className="scroll-mt-32"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-bold text-blue-600">
                  {String(step.number).padStart(2, '0')}
                </span>
                <h2 className="text-xl font-bold text-gray-900">{step.label}</h2>
              </div>

              {/* Step 1: Before/After */}
              {step.number === 1 && (
                <div className="space-y-8">
                  {portfolio.beforeItems &&
                    portfolio.beforeItems.length > 0 &&
                    portfolio.afterItems &&
                    portfolio.afterItems.length > 0 && (
                      <BeforeAfter
                        beforeItems={portfolio.beforeItems}
                        afterItems={portfolio.afterItems}
                      />
                    )}
                  {(sectionsByStep.get(step.number) || []).map((section) => (
                    <SectionRenderer key={section.id} section={section} />
                  ))}
                </div>
              )}

              {/* Step 4: Architecture + Timeline */}
              {step.number === 4 && (
                <div className="space-y-8">
                  {(sectionsByStep.get(step.number) || []).map((section) => (
                    <SectionRenderer key={section.id} section={section} />
                  ))}
                  {portfolio.milestones && portfolio.milestones.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">프로젝트 타임라인</h3>
                      <Timeline milestones={portfolio.milestones} />
                    </div>
                  )}
                </div>
              )}

              {/* Steps 2, 3: Regular section rendering */}
              {step.number !== 1 && step.number !== 4 && (
                <div className="space-y-8">
                  {(sectionsByStep.get(step.number) || []).length > 0 ? (
                    (sectionsByStep.get(step.number) || []).map((section) => (
                      <SectionRenderer key={section.id} section={section} />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm py-4">이 단계의 콘텐츠가 아직 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legacy images */}
        {portfolio.images && portfolio.images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">스크린샷</h2>
            <ImageGallery images={portfolio.images} />
          </div>
        )}
      </div>
    </article>
  );
}
