import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCitations } from '../../hooks/useCitations';
import { enrichCitation, formatAuthors, doiLink } from '../../lib/citation-utils';
import { AI_LABELS, AI_COLORS } from '../../lib/constants';
import type { CitationWithStats, Verdict } from '../../types/citation';
import { BookOpen, ExternalLink, Filter, Tag, ChevronDown, ChevronUp, Users, Layers, Hash } from 'lucide-react';
import clsx from 'clsx';

const VERDICT_STYLES: Record<Verdict, { bg: string; text: string; label: string }> = {
  support: { bg: 'bg-green-100', text: 'text-green-700', label: 'Support' },
  mention: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Mention' },
  contrast: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Contrast' },
  conflict: { bg: 'bg-red-100', text: 'text-red-700', label: 'Conflict' },
};

type SortKey = 'year' | 'aiCount' | 'topicCount' | 'consensus' | 'title';

export function CitationsPage() {
  const { data, loading, error } = useCitations();
  const [sortBy, setSortBy] = useState<SortKey>('year');
  const [sortAsc, setSortAsc] = useState(false);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 bg-gray-100 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-5xl mx-auto p-6 text-red-600">
        Lỗi tải citations: {error}
      </div>
    );
  }

  const enriched = data.items.map(enrichCitation);

  // Collect all tags
  const allTags = Array.from(new Set(data.items.flatMap(c => c.tags))).sort();

  // Filter
  const filtered = filterTag
    ? enriched.filter(c => c.tags.includes(filterTag))
    : enriched;

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    let cmp = 0;
    switch (sortBy) {
      case 'year': cmp = a.year - b.year; break;
      case 'aiCount': cmp = a.aiCount - b.aiCount; break;
      case 'topicCount': cmp = a.topicCount - b.topicCount; break;
      case 'consensus': cmp = a.consensusScore - b.consensusScore; break;
      case 'title': cmp = a.title.localeCompare(b.title); break;
    }
    return sortAsc ? cmp : -cmp;
  });

  function toggleSort(key: SortKey) {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          Citations
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {data.items.length} tài liệu tham khảo · Cập nhật {data.updatedAt}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <StatCard label="Tổng citation" value={data.items.length} icon={<BookOpen className="w-4 h-4" />} />
        <StatCard label="Topics liên quan" value={new Set(data.items.flatMap(c => c.mentions.map(m => m.topicId))).size} icon={<Layers className="w-4 h-4" />} />
        <StatCard label="AI sources" value={new Set(data.items.flatMap(c => c.mentions.map(m => m.ai))).size} icon={<Users className="w-4 h-4" />} />
        <StatCard label="Tags" value={allTags.length} icon={<Tag className="w-4 h-4" />} />
      </div>

      {/* Filters + Sort */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Filter className="w-4 h-4" />
          <span>Lọc:</span>
        </div>
        <button
          onClick={() => setFilterTag(null)}
          className={clsx(
            'px-2.5 py-1 text-xs rounded-full transition-colors',
            !filterTag ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          Tất cả
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setFilterTag(filterTag === tag ? null : tag)}
            className={clsx(
              'px-2.5 py-1 text-xs rounded-full transition-colors',
              filterTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sort bar */}
      <div className="flex items-center gap-1 mb-4 text-xs text-gray-500">
        <span>Sắp xếp:</span>
        {([
          ['year', 'Năm'],
          ['aiCount', 'AI count'],
          ['topicCount', 'Topics'],
          ['consensus', 'Consensus'],
          ['title', 'Tiêu đề'],
        ] as [SortKey, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggleSort(key)}
            className={clsx(
              'px-2 py-1 rounded transition-colors',
              sortBy === key ? 'bg-blue-100 text-blue-700 font-medium' : 'hover:bg-gray-100'
            )}
          >
            {label}
            {sortBy === key && (sortAsc ? ' ↑' : ' ↓')}
          </button>
        ))}
      </div>

      {/* Citations list */}
      <div className="space-y-3">
        {sorted.map(citation => (
          <CitationCard
            key={citation.id}
            citation={citation}
            isExpanded={expandedId === citation.id}
            onToggle={() => setExpandedId(expandedId === citation.id ? null : citation.id)}
          />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          Không có citation nào khớp bộ lọc.
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <div className="flex items-center justify-center gap-1.5 text-gray-400 mb-1">
        {icon}
      </div>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function CitationCard({
  citation,
  isExpanded,
  onToggle,
}: {
  citation: CitationWithStats;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const aiSources = Array.from(new Set(citation.mentions.map(m => m.ai)));
  const topicIds = Array.from(new Set(citation.mentions.map(m => m.topicId)));

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      {/* Main row */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-4"
      >
        {/* Year badge */}
        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-gray-900">{citation.year}</span>
          <span className="text-[10px] text-gray-400 uppercase">{citation.type}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 leading-snug">
            {citation.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {formatAuthors(citation.authors)} · <span className="italic">{citation.venue}</span>
          </p>

          {/* Tags + AI dots */}
          <div className="flex items-center gap-3 mt-2">
            {/* AI source dots */}
            <div className="flex items-center gap-1">
              {aiSources.map(ai => (
                <div
                  key={ai}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] text-white font-bold"
                  style={{ backgroundColor: AI_COLORS[ai] }}
                  title={AI_LABELS[ai]}
                >
                  {AI_LABELS[ai][0]}
                </div>
              ))}
            </div>

            {/* Topic count */}
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {topicIds.length} topic{topicIds.length > 1 ? 's' : ''}
            </span>

            {/* Cite key */}
            <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
              <Hash className="w-3 h-3" />
              {citation.citeKey}
            </span>
          </div>
        </div>

        {/* Expand icon */}
        <div className="flex-shrink-0 text-gray-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 space-y-4">
          {/* Notes */}
          {citation.notes && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Ghi chú</p>
              <p className="text-sm text-gray-700">{citation.notes}</p>
            </div>
          )}

          {/* DOI */}
          {citation.doi && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">DOI</p>
              <a
                href={doiLink(citation.doi)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {citation.doi}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Tags</p>
            <div className="flex gap-1.5 flex-wrap">
              {citation.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mentions table */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Xuất hiện trong</p>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs">
                    <th className="py-2 px-3 text-left font-medium">Topic</th>
                    <th className="py-2 px-3 text-left font-medium">AI Source</th>
                    <th className="py-2 px-3 text-left font-medium">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {citation.mentions.map((m, i) => {
                    const vs = VERDICT_STYLES[m.verdict];
                    return (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="py-2 px-3">
                          <Link
                            to={`/topic/${m.topicId}`}
                            className="text-blue-600 hover:underline"
                          >
                            {m.topicId}
                          </Link>
                        </td>
                        <td className="py-2 px-3">
                          <span className="flex items-center gap-1.5">
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: AI_COLORS[m.ai] }}
                            />
                            {AI_LABELS[m.ai]}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <span className={clsx('px-2 py-0.5 rounded text-xs font-medium', vs.bg, vs.text)}>
                            {vs.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
