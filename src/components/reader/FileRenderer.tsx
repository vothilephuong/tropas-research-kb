import { useMarkdown } from '../../hooks/useMarkdown';
import { MarkdownViewer } from './MarkdownViewer';
import { PdfViewer } from './PdfViewer';
import { ImageViewer } from './ImageViewer';
import { FileDown } from 'lucide-react';

interface FileRendererProps {
  filePath: string;
}

function getExtension(path: string): string {
  const parts = path.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
}

export function FileRenderer({ filePath }: FileRendererProps) {
  const ext = getExtension(filePath);

  if (ext === 'md') {
    return <MarkdownFileRenderer filePath={filePath} />;
  }

  if (ext === 'pdf') {
    return <PdfViewer src={filePath} />;
  }

  if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
    return <ImageViewer src={filePath} alt={filePath} />;
  }

  // DOCX and other files — download card
  const fullSrc = `${import.meta.env.BASE_URL}data/${filePath}`;
  const fileName = filePath.split('/').pop() || filePath;

  return (
    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
      <FileDown className="w-10 h-10 text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
        <p className="text-xs text-gray-500 mt-1">
          {ext.toUpperCase()} — App không render file loại này. Tải về để xem.
        </p>
      </div>
      <a
        href={fullSrc}
        download
        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex-shrink-0"
      >
        Tải xuống
      </a>
    </div>
  );
}

function MarkdownFileRenderer({ filePath }: { filePath: string }) {
  const { content, loading, error } = useMarkdown(filePath);

  if (loading) {
    return (
      <div className="animate-pulse space-y-3 p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
        Không thể tải file: {filePath}
      </div>
    );
  }

  return <MarkdownViewer content={content} />;
}
