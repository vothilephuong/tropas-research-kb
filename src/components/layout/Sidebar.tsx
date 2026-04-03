import { TopicTree } from '../navigator/TopicTree';
import { Link, useLocation } from 'react-router-dom';
import { BookText, FileText } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar() {
  const location = useLocation();
  const isCitationsActive = location.pathname.startsWith('/citations');

  return (
    <div className="flex flex-col h-full">
      {/* Topic list — scrollable */}
      <div className="flex-1 overflow-y-auto">
        <TopicTree />
      </div>

      {/* Bottom links */}
      <div className="border-t border-gray-200 p-2 space-y-1">
        <Link
          to="/citations"
          className={clsx(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
            isCitationsActive
              ? 'bg-blue-50 text-blue-900 border border-blue-200'
              : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <BookText className="w-4 h-4" />
          Citations
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Home
        </Link>
      </div>
    </div>
  );
}
