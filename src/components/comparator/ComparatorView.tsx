import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useManifest } from '../../hooks/useManifest';
import { getTopicById } from '../../lib/fetchers';
import { AI_ORDER, AI_LABELS, AI_COLORS, type AiSource } from '../../lib/constants';
import { AiColumn } from './AiColumn';
import { Eye, EyeOff, Columns3, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

export function ComparatorView() {
  const { topicId } = useParams<{ topicId: string }>();
  const { manifest, loading } = useManifest();
  const [hiddenColumns, setHiddenColumns] = useState<Set<AiSource>>(new Set());
  const [showTogglePanel, setShowTogglePanel] = useState(false);

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

  const visibleColumns = AI_ORDER.filter(ai => !hiddenColumns.has(ai));
  const visibleCount = visibleColumns.length;
  const availableCount = AI_ORDER.filter(ai => topic.files[ai]).length;

  function toggleColumn(ai: AiSource) {
    setHiddenColumns(prev => {
      const next = new Set(prev);
      if (next.has(ai)) {
        next.delete(ai);
      } else {
        // Don't allow hiding all columns
        if (visibleCount <= 1) return prev;
        next.add(ai);
      }
      return next;
    });
  }

  function resetColumns() {
    setHiddenColumns(new Set());
  }

  // Dynamic grid columns based on visible count
  const gridClass = (() => {
    switch (visibleCount) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      default: return 'grid-cols-4';
    }
  })();

  return (
    <div className="flex flex-col h-full p-4">
      {/* Topic header — enhanced */}
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
          </div>

          {/* Column toggle button */}
          <button
            onClick={() => setShowTogglePanel(!showTogglePanel)}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-colors flex-shrink-0',
              showTogglePanel
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            )}
          >
            <Columns3 className="w-3.5 h-3.5" />
            {visibleCount}/{availableCount} cột
          </button>
        </div>

        {/* Metadata bar */}
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          {/* Tags */}
          {topic.tags.length > 0 && (
            <div className="flex gap-1.5">
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

          {/* Status badge */}
          {topic.status && (
            <span className={clsx(
              'px-2 py-0.5 text-xs rounded-full font-medium',
              topic.status === 'complete'
                ? 'bg-green-100 text-green-700'
                : topic.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-600'
            )}>
              {topic.status}
            </span>
          )}

          {/* AI availability indicators */}
          <div className="flex items-center gap-1 ml-auto">
            {AI_ORDER.map(ai => {
              const hasFile = !!topic.files[ai];
              const isHidden = hiddenColumns.has(ai);
              return (
                <div
                  key={ai}
                  className={clsx(
                    'w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold transition-opacity',
                    hasFile ? 'text-white' : 'text-gray-300 bg-gray-100',
                    isHidden && 'opacity-30'
                  )}
                  style={hasFile ? { backgroundColor: AI_COLORS[ai] } : undefined}
                  title={`${AI_LABELS[ai]}${!hasFile ? ' (chưa có)' : isHidden ? ' (ẩn)' : ''}`}
                >
                  {AI_LABELS[ai][0]}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column toggle panel */}
        {showTogglePanel && (
          <div className="mt-3 p-3 bg-white border border-gray-200 rounded-xl flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 mr-1">Hiện/ẩn:</span>
            {AI_ORDER.map(ai => {
              const hasFile = !!topic.files[ai];
              const isHidden = hiddenColumns.has(ai);
              return (
                <button
                  key={ai}
                  disabled={!hasFile}
                  onClick={() => toggleColumn(ai)}
                  className={clsx(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all',
                    !hasFile
                      ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400'
                      : isHidden
                      ? 'border-gray-200 text-gray-400 hover:border-gray-300 bg-gray-50'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                  )}
                >
                  <div
                    className={clsx('w-2.5 h-2.5 rounded-full', isHidden && 'opacity-30')}
                    style={{ backgroundColor: AI_COLORS[ai] }}
                  />
                  {AI_LABELS[ai]}
                  {isHidden ? (
                    <EyeOff className="w-3 h-3 ml-0.5" />
                  ) : (
                    <Eye className="w-3 h-3 ml-0.5" />
                  )}
                </button>
              );
            })}

            {hiddenColumns.size > 0 && (
              <button
                onClick={resetColumns}
                className="flex items-center gap-1 px-2 py-1.5 text-xs text-blue-600 hover:text-blue-700 transition-colors ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                Hiện tất cả
              </button>
            )}
          </div>
        )}
      </div>

      {/* AI columns — dynamic grid */}
      <div className={clsx('grid gap-3 flex-1 min-h-0', gridClass)}>
        {visibleColumns.map(ai => (
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
