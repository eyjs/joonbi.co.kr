'use client';

import { useState, useCallback } from 'react';

interface ScreenshotGalleryProps {
  images: string[];
  caption?: string;
}

export function ScreenshotGallery({ images, caption }: ScreenshotGalleryProps): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => setSelectedIndex(null), []);
  const handlePrev = useCallback(
    () => setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev)),
    [],
  );
  const handleNext = useCallback(
    () =>
      setSelectedIndex((prev) =>
        prev !== null && prev < images.length - 1 ? prev + 1 : prev,
      ),
    [images.length],
  );

  if (images.length === 0) {
    return <p className="text-gray-400 text-sm">스크린샷이 없습니다.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {images.map((url, index) => (
          <button
            key={url}
            type="button"
            className="aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            onClick={() => setSelectedIndex(index)}
            aria-label={`스크린샷 ${index + 1} 크게 보기`}
          >
            <img
              src={url}
              alt={`스크린샷 ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {caption && (
        <p className="text-sm text-gray-500 mt-2 text-center">{caption}</p>
      )}

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="스크린샷 뷰어"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
            onClick={handleClose}
            aria-label="닫기"
          >
            x
          </button>

          {selectedIndex > 0 && (
            <button
              type="button"
              className="absolute left-4 text-white text-4xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              onClick={handlePrev}
              aria-label="이전 스크린샷"
            >
              &lt;
            </button>
          )}

          {selectedIndex < images.length - 1 && (
            <button
              type="button"
              className="absolute right-4 text-white text-4xl hover:text-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              onClick={handleNext}
              aria-label="다음 스크린샷"
            >
              &gt;
            </button>
          )}

          <img
            src={images[selectedIndex]}
            alt={`스크린샷 ${selectedIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />

          {caption && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-lg">
              {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
}
