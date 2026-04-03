import { Link } from 'react-router-dom';
import { useMarkdown } from '../../hooks/useMarkdown';
import { MarkdownViewer } from '../reader/MarkdownViewer';
import { AI_LABELS, AI_COLORS, type AiSource } from '../../lib/constants';
import { ExternalLink } from 'lucide-react';

interface AiColumnProps {
  topicId: string;
  aiSource: AiSource;
  filePath: string | undefined;
}

function estimateWordCount(text: string): string {
  const words = text.trim().split(/\s+/).length;
  if (words >= 1000) return `~${Math.round(words / 1000)}k từ`;
  return `~${words} từ`;
}

export function AiColumn({ topicId, aiSource, filePath }: AiColumnProps) {
  const { content, loading, error } = useMarkdown(filePath);
  const color = AI_COLORS[aiSource];
  const label = AI_LABELS[aiSource];

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Header */}
      <Link
        to={`/topic/${topicId}/${aiSource}`}
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors group flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-sm text-gray-900">{label}</span>
          {content && (
            <span className="text-[10px] text-gray-400 font-normal">
              {estimateWordCount(content)}
            </span>
          )}
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors" />
      </Link>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="animate-pulse space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="h-3 bg-gray-200 rounded w-4/5" />
            <div className="h-3 bg-gray-200 rounded w-full" />
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            Lỗi tải dữ liệu
          </div>
        )}

        {!filePath && !loading && (
          <div className="flex items-center justify-center h-32 text-sm text-gray-400">
            Chưa có dữ liệu
          </div>
        )}

        {content && <MarkdownViewer content={content} className="text-xs" />}
      </div>
    </div>
  );
}
