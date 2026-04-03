import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import clsx from 'clsx';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside
          className={clsx(
            'border-r border-gray-200 bg-white flex-shrink-0 transition-all duration-200 relative',
            sidebarOpen ? 'w-72' : 'w-0'
          )}
        >
          {sidebarOpen && (
            <div className="w-72 h-full overflow-hidden">
              <Sidebar />
            </div>
          )}

          {/* Toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={clsx(
              'absolute top-2 z-10 p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors shadow-sm',
              sidebarOpen ? '-right-4' : 'left-2'
            )}
            title={sidebarOpen ? 'Thu gọn sidebar' : 'Mở sidebar'}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeft className="w-4 h-4" />
            )}
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
