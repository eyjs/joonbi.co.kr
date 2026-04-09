'use client';

interface DocumentViewerProps {
  fileUrl: string;
  fileName?: string;
}

export function DocumentViewer({ fileUrl, fileName }: DocumentViewerProps): JSX.Element {
  const isPdf = fileUrl.toLowerCase().endsWith('.pdf') || fileUrl.includes('application/pdf');
  const displayName = fileName || fileUrl.split('/').pop() || '문서';

  return (
    <div className="rounded-lg border border-white/10 overflow-hidden">
      {isPdf && (
        <div className="aspect-[4/3] bg-white">
          <iframe
            src={fileUrl}
            className="w-full h-full"
            title={displayName}
          />
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-white/5">
        <span className="text-sm text-gray-300 truncate mr-4">{displayName}</span>
        <a
          href={fileUrl}
          download={fileName}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-sm px-4 py-2 rounded-lg bg-[var(--tech-neon-cyan)] text-[var(--tech-bg-dark)] font-medium hover:opacity-90 transition-opacity"
        >
          다운로드
        </a>
      </div>
    </div>
  );
}
