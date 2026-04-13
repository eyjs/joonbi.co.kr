'use client';

import type { Portfolio } from '@/types/portfolio';
import { VideoPlayer } from './video-player';

interface ProjectHeroProps {
  portfolio: Portfolio;
}

export function ProjectHero({ portfolio }: ProjectHeroProps): JSX.Element {
  const clientDisplay = getClientDisplay(portfolio);
  const completedDate = portfolio.completedAt
    ? new Date(portfolio.completedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <section className="pt-8 pb-6" aria-label="프로젝트 개요">
      {/* Hero media */}
      {portfolio.heroVideoUrl ? (
        <div className="rounded-xl overflow-hidden mb-6">
          <VideoPlayer url={portfolio.heroVideoUrl} />
        </div>
      ) : portfolio.thumbnailUrl ? (
        <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-gray-200">
          <img
            src={portfolio.thumbnailUrl}
            alt={portfolio.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : null}

      {/* Meta info card */}
      <div className="space-y-3">
        {portfolio.category && (
          <span className="inline-block text-xs font-medium text-blue-600 uppercase tracking-wider">
            {portfolio.category}
          </span>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {portfolio.title}
        </h1>

        {portfolio.summary && (
          <p className="text-gray-500 text-base md:text-lg">{portfolio.summary}</p>
        )}

        <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
          {clientDisplay && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">클라이언트</dt>
              <dd>{clientDisplay}</dd>
            </div>
          )}
          {portfolio.duration && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">기간</dt>
              <dd>{portfolio.duration}</dd>
            </div>
          )}
          {completedDate && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">완료</dt>
              <dd>완료: {completedDate}</dd>
            </div>
          )}
        </dl>

        {portfolio.techStack && portfolio.techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {portfolio.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function getClientDisplay(portfolio: Portfolio): string | null {
  if (portfolio.displayType === 'ANONYMOUS') {
    return 'OOO';
  }
  if (portfolio.displayType === 'FULL' && portfolio.clientName) {
    return portfolio.clientName;
  }
  return null;
}
