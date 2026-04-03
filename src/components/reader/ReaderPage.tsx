import { useParams, Link } from 'react-router-dom';
import { useManifest } from '../../hooks/useManifest';
import { getTopicById } from '../../lib/fetchers';
import { AI_LABELS, AI_COLORS, type AiSource } from '../../lib/constants';
import { FileRenderer } from './FileRenderer';
import { ArrowLeft } from 'lucide-react';

export function ReaderPage() {
  const { topicId, aiSource } = useParams<{ topicId: string; aiSource: string }>();
  const { manifest, loading } = useManifest();

  if (loading || !manifest || !topicId || !aiSource) {
    return (
      <div className="animate-pulse space-y-4 p-6">
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    );
  }

  const topic = getTopicById(manifest, topicId);
  if (!topic) {
    return (
      <div className="p-6 text-red-600">
        Topic không tồn tại: {topicId}
      </div>
    );
  }

  const ai = aiSource as AiSource;
  const filePath = topic.files[ai];
  if (!filePath) {
    return (
      <div className="p-6 text-gray-500">
        Chưa có dữ liệu từ {AI_LABELS[ai] || aiSource} cho topic này.
      </div>
    );
  }

  const color = AI_COLORS[ai] || '#6B7280';

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Link
          to={`/topic/${topicId}`}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Comparator
        </Link>
        <span className="text-gray-300">/</span>
        <span
          className="font-medium px-2 py-0.5 rounded text-white text-xs"
          style={{ backgroundColor: color }}
        >
          {AI_LABELS[ai] || aiSource}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-1">{topic.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{topic.description}</p>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <FileRenderer filePath={filePath} />
      </div>
    </div>
  );
}
