import { Search, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 sticky top-0 z-30">
      <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <h1 className="text-lg font-bold text-gray-900">
          TROPAS <span className="text-blue-600">Research KB</span>
        </h1>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={onSearchClick}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          title="Tìm kiếm (Cmd+K)"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Tìm kiếm</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs text-gray-400 bg-white rounded border border-gray-200">
            ⌘K
          </kbd>
        </button>
      </div>
    </header>
  );
}
