'use client';

import { useState } from 'react';

interface ImageGalleryProps {
  images: Array<{ imageUrl: string; displayOrder: number }>;
}

export function ImageGallery({ images }: ImageGalleryProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sorted = [...images].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sorted.map((image, index) => (
          <button
            key={`${image.imageUrl}-${image.displayOrder}`}
            type="button"
            className="aspect-video rounded-lg overflow-hidden bg-white/5 cursor-pointer hover:ring-2 hover:ring-[var(--tech-neon-cyan)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--tech-neon-cyan)]"
            onClick={() => setSelectedIndex(index)}
            aria-label={`이미지 ${index + 1} 크게 보기`}
          >
            <img
              src={image.imageUrl}
              alt={`스크린샷 ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="이미지 뷰어"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10 focus:outline-none focus:ring-2 focus:ring-white rounded"
            onClick={() => setSelectedIndex(null)}
            aria-label="닫기"
          >
            x
          </button>

          {selectedIndex > 0 && (
            <button
              type="button"
              className="absolute left-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
              onClick={() => setSelectedIndex(selectedIndex - 1)}
              aria-label="이전 이미지"
            >
              &lt;
            </button>
          )}

          {selectedIndex < sorted.length - 1 && (
            <button
              type="button"
              className="absolute right-4 text-white text-4xl hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white rounded"
              onClick={() => setSelectedIndex(selectedIndex + 1)}
              aria-label="다음 이미지"
            >
              &gt;
            </button>
          )}

          <img
            src={sorted[selectedIndex].imageUrl}
            alt={`스크린샷 ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </>
  );
}
