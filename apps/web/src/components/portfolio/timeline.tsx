'use client';

import type { Milestone } from '@/types/portfolio';

interface TimelineProps {
  milestones: Milestone[];
}

export function Timeline({ milestones }: TimelineProps): JSX.Element {
  if (milestones.length === 0) return <></>;

  const sorted = [...milestones].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const startDate = new Date(sorted[0].date);
  const endDate = new Date(sorted[sorted.length - 1].date);
  const totalDays = Math.max(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
    1,
  );

  function getOffset(dateStr: string): number {
    const d = new Date(dateStr);
    const days = (d.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return (days / totalDays) * 100;
  }

  function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  const statusColor: Record<string, string> = {
    completed: 'bg-blue-500',
    in_progress: 'bg-amber-400',
    pending: 'bg-gray-300',
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* 시간축 헤더 */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1 px-1">
          <span>{formatDate(sorted[0].date)}</span>
          <span>{formatDate(sorted[sorted.length - 1].date)}</span>
        </div>
        <div className="h-px bg-gray-200 mb-3" />

        {/* 간트 바 */}
        <div className="space-y-2">
          {sorted.map((milestone, idx) => {
            const left = getOffset(milestone.date);
            const nextDate = sorted[idx + 1]?.date;
            const width = nextDate ? getOffset(nextDate) - left : 100 - left;
            const barColor = statusColor[milestone.status] || 'bg-gray-300';

            return (
              <div key={idx} className="flex items-center gap-3 h-7">
                {/* 라벨 */}
                <div className="w-40 flex-shrink-0 text-xs text-gray-600 text-right truncate">
                  {milestone.title}
                </div>

                {/* 바 트랙 */}
                <div className="flex-1 relative h-5 bg-gray-50 rounded">
                  <div
                    className={`absolute h-full rounded ${barColor} flex items-center justify-end px-2`}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 3)}%`,
                    }}
                  >
                    <span className="text-[10px] text-white font-medium">
                      {formatDate(milestone.date)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 범례 */}
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span>완료</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
            <span>진행중</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-gray-300" />
            <span>예정</span>
          </div>
        </div>
      </div>
    </div>
  );
}
