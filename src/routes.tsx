import { createHashRouter } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ComparatorView } from './components/comparator/ComparatorView';
import { ReaderPage } from './components/reader/ReaderPage';
import { CitationsPage } from './components/citations/CitationsPage';
import { GraduationCap, BookOpen, Search as SearchIcon } from 'lucide-react';
import { useManifest } from './hooks/useManifest';
import { Link } from 'react-router-dom';

function HomePage() {
  const { manifest, loading } = useManifest();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="text-center mb-8">
        <GraduationCap className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">TROPAS Research KB</h1>
        <p className="text-gray-500 mt-2">
          Knowledge Base cho luận án dự báo khí tượng thiên văn nhiệt đới
        </p>
      </div>

      {/* Quick Stats */}
      {!loading && manifest && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{manifest.topics.length}</p>
            <p className="text-sm text-gray-500">Topics</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">4</p>
            <p className="text-sm text-gray-500">AI Sources</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">
              {manifest.topics.reduce((acc, t) => acc + Object.keys(t.files).length, 0)}
            </p>
            <p className="text-sm text-gray-500">Documents</p>
          </div>
        </div>
      )}

      {/* Quick access */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gray-400" />
          Topics
        </h2>
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2].map(i => <div key={i} className="h-12 bg-gray-100 rounded-lg" />)}
          </div>
        ) : manifest?.topics.map(topic => (
          <Link
            key={topic.id}
            to={`/topic/${topic.id}`}
            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group mb-1"
          >
            <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {topic.title}
            </p>
            <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
          </Link>
        ))}
      </div>

      {/* How to use */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <SearchIcon className="w-4 h-4" />
          Cách sử dụng
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click topic trong sidebar → xem 4 AI so sánh song song</li>
          <li>• Click header cột AI → mở full reader cho file đó</li>
          <li>• Chọn "Citations" ở sidebar → xem danh sách tài liệu tham khảo</li>
        </ul>
      </div>
    </div>
  );
}



function SearchPlaceholder() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-center text-gray-500">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Tìm kiếm</h1>
      <p>Sẽ được hoàn thiện ở Phase 3.</p>
    </div>
  );
}

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'topic/:topicId', element: <ComparatorView /> },
      { path: 'topic/:topicId/:aiSource', element: <ReaderPage /> },
      { path: 'citations', element: <CitationsPage /> },
      { path: 'search', element: <SearchPlaceholder /> },
    ],
  },
]);
