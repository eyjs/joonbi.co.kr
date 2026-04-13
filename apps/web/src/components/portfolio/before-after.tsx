'use client';

import type { BeforeAfterItem } from '@/types/portfolio';

interface BeforeAfterProps {
  beforeItems: BeforeAfterItem[];
  afterItems: BeforeAfterItem[];
}

export function BeforeAfter({ beforeItems, afterItems }: BeforeAfterProps): JSX.Element {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      role="group"
      aria-label="Before/After 비교"
    >
      {/* Before */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 md:p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
          Before
        </h3>
        <ul className="space-y-3" aria-label="기존 문제점">
          {beforeItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-xs font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* After */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 md:p-6">
        <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-4">
          After
        </h3>
        <ul className="space-y-3" aria-label="개선 결과">
          {afterItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
