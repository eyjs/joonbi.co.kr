'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import type { Portfolio, PortfolioSection } from '@/types/portfolio';
import { SectionRenderer } from './section-renderer';
import { ImageGallery } from './image-gallery';
import { ProjectHero } from './project-hero';
import { BeforeAfter } from './before-after';
import { Timeline } from './timeline';

interface TocItem {
  id: string;
  label: string;
}

function buildToc(portfolio: Portfolio): TocItem[] {
  const items: TocItem[] = [];

  // 타임라인
  if (portfolio.milestones && portfolio.milestones.length > 0) {
    items.push({ id: 'timeline', label: '프로젝트 타임라인' });
  }

  // Before/After
  if (
    portfolio.beforeItems &&
    portfolio.beforeItems.length > 0 &&
    portfolio.afterItems &&
    portfolio.afterItems.length > 0
  ) {
    items.push({ id: 'before-after', label: 'Before / After' });
  }

  // 섹션
  const sorted = [...portfolio.sections].sort((a, b) => a.displayOrder - b.displayOrder);
  for (const section of sorted) {
    const title = section.title || `섹션 ${section.displayOrder}`;
    items.push({ id: `section-${section.id}`, label: title });
  }

  return items;
}

interface PortfolioDetailClientProps {
  portfolio: Portfolio;
}

export function PortfolioDetailClient({ portfolio }: PortfolioDetailClientProps): JSX.Element {
  const [activeId, setActiveId] = useState<string>('');
  const tocItems = buildToc(portfolio);
  const sortedSections = [...portfolio.sections].sort((a, b) => a.displayOrder - b.displayOrder);

  const handleTocClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 },
    );

    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [tocItems]);

  return (
    <article className="pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Project Hero */}
        <ProjectHero portfolio={portfolio} />

        {/* 목차 */}
        {tocItems.length > 1 && (
          <nav className="my-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">목차</h2>
            <ul className="space-y-1.5">
              {tocItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTocClick(item.id)}
                    className={`text-sm text-left w-full px-2 py-1 rounded transition-colors ${
                      activeId === item.id
                        ? 'text-blue-600 bg-blue-50 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* 프로젝트 타임라인 (상단) */}
        {portfolio.milestones && portfolio.milestones.length > 0 && (
          <section id="timeline" className="mb-12 scroll-mt-28">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              프로젝트 타임라인
            </h2>
            <Timeline milestones={portfolio.milestones} />
          </section>
        )}

        {/* Before/After */}
        {portfolio.beforeItems &&
          portfolio.beforeItems.length > 0 &&
          portfolio.afterItems &&
          portfolio.afterItems.length > 0 && (
            <section id="before-after" className="mb-12 scroll-mt-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Before / After
              </h2>
              <BeforeAfter
                beforeItems={portfolio.beforeItems}
                afterItems={portfolio.afterItems}
              />
            </section>
          )}

        {/* 섹션 콘텐츠 (Markdown 중심) */}
        <div className="space-y-12">
          {sortedSections.map((section) => (
            <section
              key={section.id}
              id={`section-${section.id}`}
              className="scroll-mt-28"
            >
              {section.title && (
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {section.title}
                </h2>
              )}
              <SectionRenderer section={{ ...section, title: undefined }} />
            </section>
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
