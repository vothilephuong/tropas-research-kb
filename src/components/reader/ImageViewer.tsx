import { useState } from 'react';

interface ImageViewerProps {
  src: string;
  alt?: string;
}

export function ImageViewer({ src, alt = '' }: ImageViewerProps) {
  const [expanded, setExpanded] = useState(false);
  const fullSrc = `${import.meta.env.BASE_URL}data/${src}`;

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <img
          src={fullSrc}
          alt={alt}
          className="max-w-full max-h-[70vh] rounded-lg shadow-md cursor-zoom-in hover:shadow-lg transition-shadow"
          onClick={() => setExpanded(true)}
        />
      </div>

      {expanded && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-zoom-out"
          onClick={() => setExpanded(false)}
        >
          <img
            src={fullSrc}
            alt={alt}
            className="max-w-[95vw] max-h-[95vh] rounded-lg"
          />
        </div>
      )}
    </>
  );
}
