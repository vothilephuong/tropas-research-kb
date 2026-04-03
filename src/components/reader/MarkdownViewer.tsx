import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  return (
    <div className={`prose prose-sm max-w-none prose-headings:scroll-mt-16 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-table:text-xs prose-img:rounded-lg ${className}`}>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSanitize]}>
        {content}
      </Markdown>
    </div>
  );
}
