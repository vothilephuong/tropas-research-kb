import { useState, useEffect } from 'react';
import { fetchCitations } from '../lib/fetchers';
import type { CitationsData } from '../types/citation';

export function useCitations() {
  const [data, setData] = useState<CitationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCitations()
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
