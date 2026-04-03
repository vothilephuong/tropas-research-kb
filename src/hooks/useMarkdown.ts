import { useState, useEffect } from 'react';
import { fetchMarkdown } from '../lib/fetchers';

export function useMarkdown(path: string | null | undefined) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      setContent(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchMarkdown(path)
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [path]);

  return { content, loading, error };
}
