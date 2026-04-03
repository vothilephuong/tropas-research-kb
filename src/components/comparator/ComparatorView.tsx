import { useParams } from 'react-router-dom';
import { useManifest } from '../../hooks/useManifest';
import { getTopicById } from '../../lib/fetchers';
import { AI_ORDER } from '../../lib/constants';
import { AiColumn } from './AiColumn';

export function ComparatorView() {
  const { topicId } = useParams<{ topicId: string }>();
  const { manifest, loading } = useManifest();

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!manifest || !topicId) {
    return (
      <div className="p-6 text-gray-500">Không tìm thấy topic.</div>
    );
  }

  const topic = getTopicById(manifest, topicId);
  if (!topic) {
    return (
      <div className="p-6 text-red-600">
        Topic không tồn tại: <code>{topicId}</code>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4">
      {/* Topic header */}
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
        {topic.tags.length > 0 && (
          <div className="flex gap-1.5 mt-2">
            {topic.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4 AI columns */}
      <div className="grid grid-cols-4 gap-3 flex-1 min-h-0">
        {AI_ORDER.map(ai => (
          <AiColumn
            key={ai}
            topicId={topicId}
            aiSource={ai}
            filePath={topic.files[ai]}
          />
        ))}
      </div>
    </div>
  );
}
