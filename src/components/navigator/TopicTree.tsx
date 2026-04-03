import { Link, useParams } from 'react-router-dom';
import { useManifest } from '../../hooks/useManifest';
import { BookOpen, CheckCircle, Clock, FileEdit } from 'lucide-react';
import clsx from 'clsx';

const STATUS_ICONS = {
  complete: CheckCircle,
  'in-progress': Clock,
  draft: FileEdit,
} as const;

const STATUS_COLORS = {
  complete: 'text-green-500',
  'in-progress': 'text-amber-500',
  draft: 'text-gray-400',
} as const;

export function TopicTree() {
  const { manifest, loading, error } = useManifest();
  const { topicId: activeTopicId } = useParams();

  if (loading) {
    return (
      <div className="space-y-2 p-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse h-12 bg-gray-100 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg m-2">
        Lỗi tải manifest: {error}
      </div>
    );
  }

  if (!manifest || manifest.topics.length === 0) {
    return (
      <div className="p-3 text-sm text-gray-500 m-2">
        Chưa có topic nào. Thêm topic vào <code>public/data/topics/</code>
      </div>
    );
  }

  return (
    <nav className="space-y-1 p-2">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
        Topics ({manifest.topics.length})
      </p>
      {manifest.topics.map(topic => {
        const isActive = topic.id === activeTopicId;
        const StatusIcon = STATUS_ICONS[topic.status] || FileEdit;
        const statusColor = STATUS_COLORS[topic.status] || 'text-gray-400';

        return (
          <Link
            key={topic.id}
            to={`/topic/${topic.id}`}
            className={clsx(
              'flex items-start gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors group',
              isActive
                ? 'bg-blue-50 text-blue-900 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <BookOpen className={clsx('w-4 h-4 mt-0.5 flex-shrink-0', isActive ? 'text-blue-600' : 'text-gray-400')} />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{topic.title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <StatusIcon className={clsx('w-3 h-3', statusColor)} />
                <span className="text-xs text-gray-400">{topic.status}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
