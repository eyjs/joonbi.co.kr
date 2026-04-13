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

  function formatAxisDate(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}월 ${d.getDate()}일`;
  }

  const statusColor: Record<string, string> = {
    completed: 'bg-blue-500',
    in_progress: 'bg-amber-400',
    pending: 'bg-gray-300',
  };

  // x축 눈금: 시작, 중간(있으면), 끝
  const axisTicks: { label: string; offset: number }[] = [];
  axisTicks.push({ label: formatAxisDate(sorted[0].date), offset: 0 });
  if (sorted.length > 2) {
    const midIdx = Math.floor(sorted.length / 2);
    axisTicks.push({
      label: formatAxisDate(sorted[midIdx].date),
      offset: getOffset(sorted[midIdx].date),
    });
  }
  axisTicks.push({ label: formatAxisDate(sorted[sorted.length - 1].date), offset: 100 });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[600px]">
        {/* 범례 (상단) */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-blue-500" />
            <span>완료</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-amber-400" />
            <span>진행중</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-sm bg-gray-300" />
            <span>예정</span>
          </div>
        </div>

        {/* 간트 바 */}
        <div className="space-y-1.5">
          {sorted.map((milestone, idx) => {
            const left = getOffset(milestone.date);
            const nextDate = sorted[idx + 1]?.date;
            const width = nextDate ? getOffset(nextDate) - left : 100 - left;
            const barColor = statusColor[milestone.status] || 'bg-gray-300';

            return (
              <div key={idx} className="flex items-center gap-3 h-6">
                {/* 라벨 */}
                <div className="w-44 flex-shrink-0 text-xs text-gray-600 text-right truncate">
                  {milestone.title}
                </div>

                {/* 바 트랙 */}
                <div className="flex-1 relative h-5 bg-gray-50 rounded">
                  <div
                    className={`absolute h-full rounded ${barColor}`}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 2)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* x축 날짜 */}
        <div className="flex items-center gap-3 mt-2">
          <div className="w-44 flex-shrink-0" />
          <div className="flex-1 relative h-6">
            <div className="absolute inset-x-0 top-0 h-px bg-gray-200" />
            {axisTicks.map((tick, i) => (
              <div
                key={i}
                className="absolute text-[10px] text-gray-400 -translate-x-1/2"
                style={{ left: `${tick.offset}%`, top: '4px' }}
              >
                {tick.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
