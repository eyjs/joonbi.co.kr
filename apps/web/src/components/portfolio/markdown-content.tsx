'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps): JSX.Element {
  return (
    <div className="prose prose-sm max-w-none
      prose-headings:text-gray-900 prose-headings:font-bold
      prose-p:text-gray-600 prose-p:leading-relaxed
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900
      prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:rounded
      prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200
      prose-ul:text-gray-600 prose-ol:text-gray-600
      prose-table:text-gray-600
      prose-th:text-gray-900 prose-th:border-gray-200
      prose-td:border-gray-200"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
