'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps): JSX.Element {
  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-headings:text-white prose-headings:font-bold
      prose-p:text-gray-300 prose-p:leading-relaxed
      prose-a:text-[var(--tech-neon-cyan)] prose-a:no-underline hover:prose-a:underline
      prose-strong:text-white
      prose-code:text-[var(--tech-neon-cyan)] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
      prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
      prose-ul:text-gray-300 prose-ol:text-gray-300
      prose-table:text-gray-300
      prose-th:text-white prose-th:border-white/20
      prose-td:border-white/10"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
