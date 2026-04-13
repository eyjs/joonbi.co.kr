'use client';

import dynamic from 'next/dynamic';
import type { Portfolio, PortfolioSection } from '@/types/portfolio';
import { BeforeAfter } from './before-after';
import { Timeline } from './timeline';
import { MarkdownContent } from './markdown-content';

const MermaidDiagram = dynamic(
  () => import('./mermaid-diagram').then((mod) => ({ default: mod.MermaidDiagram })),
  { ssr: false, loading: () => <div className="h-40 bg-gray-100 rounded-lg animate-pulse" /> },
);

interface ReportLayoutProps {
  portfolio: Portfolio;
}

function getSectionsByType(sections: PortfolioSection[], types: string[]): PortfolioSection[] {
  return sections
    .filter((s) => types.includes(s.sectionType))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function getClientDisplay(portfolio: Portfolio): string {
  if (portfolio.displayType === 'ANONYMOUS') return 'OOO';
  return portfolio.clientName || '';
}

export function ReportLayout({ portfolio }: ReportLayoutProps): JSX.Element {
  const solutionSections = getSectionsByType(portfolio.sections, ['BRIEF', 'OVERVIEW']);
  const screenshotSections = getSectionsByType(portfolio.sections, ['SCREENSHOT', 'IMAGES']);
  const diagramSections = getSectionsByType(portfolio.sections, ['DIAGRAM']);
  const videoSections = getSectionsByType(portfolio.sections, ['VIDEO']);

  const hasBeforeAfter =
    portfolio.beforeItems &&
    portfolio.beforeItems.length > 0 &&
    portfolio.afterItems &&
    portfolio.afterItems.length > 0;

  const screenshotUrls = screenshotSections.flatMap((s) => s.imageUrls || []);

  return (
    <div className="report-container">
      {/* Page 1: Cover */}
      <section className="report-page flex flex-col items-center justify-center text-center bg-gray-900 text-white">
        <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-3xl">
          {portfolio.category && (
            <span className="text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
              {portfolio.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {portfolio.title}
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            {getClientDisplay(portfolio)}
          </p>
          {portfolio.thumbnailUrl && (
            <div className="w-full max-w-2xl aspect-video rounded-xl overflow-hidden">
              <img
                src={portfolio.thumbnailUrl}
                alt={portfolio.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="pb-8 text-sm text-gray-500">
          {portfolio.duration || ''}
        </div>
      </section>

      {/* Page 2: Project Overview */}
      <section className="report-page flex flex-col justify-center px-12 md:px-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">프로젝트 개요</h2>
        <div className="space-y-6">
          {portfolio.summary && (
            <p className="text-lg text-gray-700 leading-relaxed">{portfolio.summary}</p>
          )}
          <dl className="grid grid-cols-2 gap-4 text-sm">
            {portfolio.category && (
              <div>
                <dt className="text-gray-400 font-medium">카테고리</dt>
                <dd className="text-gray-900 mt-1">{portfolio.category}</dd>
              </div>
            )}
            <div>
              <dt className="text-gray-400 font-medium">클라이언트</dt>
              <dd className="text-gray-900 mt-1">{getClientDisplay(portfolio)}</dd>
            </div>
            {portfolio.duration && (
              <div>
                <dt className="text-gray-400 font-medium">기간</dt>
                <dd className="text-gray-900 mt-1">{portfolio.duration}</dd>
              </div>
            )}
          </dl>
          {portfolio.techStack && portfolio.techStack.length > 0 && (
            <div>
              <p className="text-gray-400 font-medium text-sm mb-2">기술 스택</p>
              <div className="flex flex-wrap gap-2">
                {portfolio.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Page 3: Before/After */}
      {hasBeforeAfter && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Before / After</h2>
          <BeforeAfter
            beforeItems={portfolio.beforeItems!}
            afterItems={portfolio.afterItems!}
          />
        </section>
      )}

      {/* Page 4: Solution */}
      {solutionSections.length > 0 && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">솔루션</h2>
          <div className="space-y-6">
            {solutionSections.map((section) => (
              <div key={section.id}>
                {section.title && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                )}
                {section.textContent && (
                  <MarkdownContent content={section.textContent} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Page 5: Results - Screenshots */}
      {screenshotUrls.length > 0 && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">결과 - 스크린샷</h2>
          <div className="grid grid-cols-2 gap-4">
            {screenshotUrls.slice(0, 6).map((url, index) => (
              <div key={url} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={url}
                  alt={`스크린샷 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Page 5b: Results - Video references */}
      {videoSections.length > 0 && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">결과 - 시연 영상</h2>
          <div className="space-y-4">
            {videoSections.map((section) => (
              <div key={section.id} className="p-4 border border-gray-200 rounded-lg">
                {section.title && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                )}
                <p className="text-sm text-gray-500">
                  영상 URL: {section.videoUrl}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Page 6: Architecture - Diagrams */}
      {diagramSections.length > 0 && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">아키텍처</h2>
          <div className="space-y-6">
            {diagramSections.map((section) => (
              <div key={section.id}>
                {section.title && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{section.title}</h3>
                )}
                {section.diagramCode && (
                  <MermaidDiagram code={section.diagramCode} diagramKind={section.diagramKind} />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Page 7: Timeline */}
      {portfolio.milestones && portfolio.milestones.length > 0 && (
        <section className="report-page flex flex-col justify-center px-12 md:px-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">프로젝트 타임라인</h2>
          <Timeline milestones={portfolio.milestones} />
        </section>
      )}

      {/* Page 8: Ending */}
      <section className="report-page flex flex-col items-center justify-center text-center bg-gray-900 text-white">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">JOONBI STUDIO</h2>
          <p className="text-gray-400 text-lg">
            준비된 개발 파트너
          </p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>joonbi.co.kr</p>
          </div>
        </div>
      </section>

      {/* Print styles */}
      <style jsx>{`
        .report-container {
          max-width: 1024px;
          margin: 0 auto;
        }
        .report-page {
          min-height: 100vh;
          position: relative;
        }
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          .report-page {
            page-break-before: always;
            height: 100vh;
            overflow: hidden;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .report-page:first-child {
            page-break-before: avoid;
          }
          .no-print {
            display: none !important;
          }
          .report-container {
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
