'use client';

import { useEffect, useRef, useState } from 'react';

interface MermaidDiagramProps {
  code: string;
  diagramKind?: string;
}

/**
 * Mermaid 다이어그램 렌더링 컴포넌트.
 * Mermaid의 render() 메서드는 자체 DSL 파서를 통해 SVG를 생성하며,
 * 임의의 HTML을 주입하지 않는다. 관리자만 Mermaid DSL을 입력할 수 있으므로
 * XSS 위험이 없다. (관리자 전용 입력 -> Mermaid DSL 파서 -> SVG 출력)
 */
export function MermaidDiagram({ code, diagramKind }: MermaidDiagramProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

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

        // Mermaid render()는 sanitized SVG를 생성하고 container에 삽입
        const id = `mermaid-${Date.now()}`;
        const { svg, bindFunctions } = await mermaid.render(id, code);

        if (containerRef.current && isMounted) {
          // Mermaid가 생성한 SVG DOM을 파싱하여 안전하게 삽입
          const parser = new DOMParser();
          const doc = parser.parseFromString(svg, 'image/svg+xml');
          const svgElement = doc.documentElement;

          containerRef.current.replaceChildren();
          containerRef.current.appendChild(
            containerRef.current.ownerDocument.importNode(svgElement, true),
          );

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

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600 mb-2">다이어그램 렌더링 오류</p>
        <pre className="text-xs text-gray-500 overflow-x-auto">{code}</pre>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      {diagramKind && (
        <span className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
          {diagramKind}
        </span>
      )}
      <div ref={containerRef} className="flex justify-center" />
    </div>
  );
}
