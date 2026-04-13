'use client';

import type { Milestone } from '@/types/portfolio';

interface TimelineProps {
  milestones: Milestone[];
}

const STATUS_STYLES: Record<string, { dot: string; line: string; label: string }> = {
  completed: {
    dot: 'bg-green-500',
    line: 'bg-green-200',
    label: '완료',
  },
  in_progress: {
    dot: 'bg-blue-500 ring-4 ring-blue-100',
    line: 'bg-blue-200',
    label: '진행중',
  },
  pending: {
    dot: 'bg-gray-300',
    line: 'bg-gray-200',
    label: '대기',
  },
};

export function Timeline({ milestones }: TimelineProps): JSX.Element {
  return (
    <div className="relative" role="list" aria-label="프로젝트 타임라인">
      {milestones.map((milestone, index) => {
        const style = STATUS_STYLES[milestone.status] ?? STATUS_STYLES.pending;
        const isLast = index === milestones.length - 1;

        return (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0" role="listitem">
            {/* Vertical line */}
            {!isLast && (
              <div
                className={`absolute left-[11px] top-6 w-0.5 h-full ${style.line}`}
                aria-hidden="true"
              />
            )}

            {/* Dot */}
            <div className="relative flex-shrink-0 mt-1">
              <div className={`w-[22px] h-[22px] rounded-full ${style.dot}`} aria-hidden="true" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-900">{milestone.title}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    milestone.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : milestone.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {style.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{milestone.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
