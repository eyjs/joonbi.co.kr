'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface MermaidDiagramProps {
  code: string;
  diagramKind?: string;
}

/**
 * Mermaid 다이어그램 렌더링 컴포넌트.
 * 클릭 시 풀스크린 모달로 확대 표시 (모바일 가독성).
 * Mermaid render()가 생성한 sanitized SVG만 사용하므로 XSS 위험 없음.
 * 관리자만 Mermaid DSL을 입력 가능 (관리자 전용 입력 → Mermaid DSL 파서 → SVG 출력).
 */
export function MermaidDiagram({ code, diagramKind }: MermaidDiagramProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [renderedSvgNode, setRenderedSvgNode] = useState<Node | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderDiagram(): Promise<void> {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'strict',
          themeVariables: {
            primaryColor: '#dbeafe',
            primaryTextColor: '#1e293b',
            primaryBorderColor: '#3b82f6',
            lineColor: '#64748b',
            secondaryColor: '#f1f5f9',
            tertiaryColor: '#e2e8f0',
            fontSize: '14px',
          },
        });

        if (!containerRef.current || !isMounted) return;

        const id = `mermaid-${Date.now()}`;
        const { svg, bindFunctions } = await mermaid.render(id, code);

        if (containerRef.current && isMounted) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, 'image/svg+xml');
          const svgElement = doc.documentElement;
          const importedNode = containerRef.current.ownerDocument.importNode(svgElement, true);

          containerRef.current.replaceChildren();
          containerRef.current.appendChild(importedNode);
          setRenderedSvgNode(importedNode.cloneNode(true));

          if (bindFunctions) {
            bindFunctions(containerRef.current);
          }
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Mermaid 렌더링 실패');
        }
      }
    }

    renderDiagram();
    return () => { isMounted = false; };
  }, [code]);

  // 모달 열릴 때 SVG 노드를 복제하여 삽입
  useEffect(() => {
    if (isModalOpen && modalContainerRef.current && renderedSvgNode) {
      modalContainerRef.current.replaceChildren();
      modalContainerRef.current.appendChild(renderedSvgNode.cloneNode(true));
    }
  }, [isModalOpen, renderedSvgNode]);

  const handleClose = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    if (!isModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isModalOpen]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600 mb-2">다이어그램 렌더링 오류</p>
        <pre className="text-xs text-gray-500 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  return (
    <>
      <div
        className="overflow-x-auto cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="다이어그램 확대 보기"
        onKeyDown={(e) => { if (e.key === 'Enter') setIsModalOpen(true); }}
      >
        <div className="text-center mb-2">
          <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">
            클릭하여 확대
          </span>
        </div>
        <div ref={containerRef} className="flex justify-center" />
      </div>

      {/* 풀스크린 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-white flex flex-col"
          onClick={handleClose}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              {diagramKind || '다이어그램'}
            </span>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              aria-label="닫기"
            >
              &times;
            </button>
          </div>
          <div
            className="flex-1 overflow-auto p-6 flex items-start justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={modalContainerRef} className="min-w-[800px]" />
          </div>
        </div>
      )}
    </>
  );
}
