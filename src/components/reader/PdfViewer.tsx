interface PdfViewerProps {
  src: string;
}

export function PdfViewer({ src }: PdfViewerProps) {
  const fullSrc = `${import.meta.env.BASE_URL}data/${src}`;

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col">
      <object
        data={fullSrc}
        type="application/pdf"
        className="w-full flex-1 min-h-[600px] rounded-lg border border-gray-200"
      >
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <p className="mb-4">Trình duyệt không hỗ trợ xem PDF inline.</p>
          <a
            href={fullSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mở trong tab mới
          </a>
        </div>
      </object>
    </div>
  );
}
