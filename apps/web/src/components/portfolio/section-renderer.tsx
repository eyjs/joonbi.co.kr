'use client';

import dynamic from 'next/dynamic';
import type { PortfolioSection } from '@/types/portfolio';
import { MarkdownContent } from './markdown-content';
import { VideoPlayer } from './video-player';
import { DocumentViewer } from './document-viewer';
import { ImageGallery } from './image-gallery';

const MermaidDiagram = dynamic(
  () => import('./mermaid-diagram').then((mod) => ({ default: mod.MermaidDiagram })),
  { ssr: false, loading: () => <div className="h-40 bg-white/5 rounded-lg animate-pulse" /> },
);

interface SectionRendererProps {
  section: PortfolioSection;
}

export function SectionRenderer({ section }: SectionRendererProps): JSX.Element {
  return (
    <div className="mb-8">
      {section.title && (
        <h2 className="text-xl font-bold text-white mb-4">{section.title}</h2>
      )}

      {renderContent(section)}
    </div>
  );
}

function renderContent(section: PortfolioSection): JSX.Element {
  switch (section.sectionType) {
    case 'OVERVIEW':
    case 'BRIEF':
      return section.textContent ? (
        <MarkdownContent content={section.textContent} />
      ) : (
        <p className="text-gray-500 text-sm">내용이 없습니다.</p>
      );

    case 'VIDEO':
      return section.videoUrl ? (
        <VideoPlayer url={section.videoUrl} />
      ) : (
        <p className="text-gray-500 text-sm">동영상 URL이 없습니다.</p>
      );

    case 'DIAGRAM':
      return section.diagramCode ? (
        <MermaidDiagram code={section.diagramCode} diagramKind={section.diagramKind} />
      ) : (
        <p className="text-gray-500 text-sm">다이어그램 코드가 없습니다.</p>
      );

    case 'DOCUMENT':
      return section.fileUrl ? (
        <DocumentViewer fileUrl={section.fileUrl} fileName={section.fileName} />
      ) : (
        <p className="text-gray-500 text-sm">문서가 없습니다.</p>
      );

    case 'IMAGES':
      return <p className="text-gray-500 text-sm">이미지 갤러리는 상단 이미지 섹션을 참조하세요.</p>;

    default:
      return <p className="text-gray-500 text-sm">알 수 없는 섹션 타입입니다.</p>;
  }
}
