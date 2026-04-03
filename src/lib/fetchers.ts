import type { Manifest, TopicManifestEntry } from '../types/manifest';

export type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const BASE = import.meta.env.BASE_URL;

function dataUrl(path: string): string {
  return `${BASE}data/${path}`;
}

export async function fetchManifest(): Promise<Manifest> {
  const res = await fetch(dataUrl('manifest.json'));
  if (!res.ok) throw new Error(`Failed to fetch manifest: ${res.status}`);
  return res.json();
}

export async function fetchMarkdown(path: string): Promise<string | null> {
  try {
    const res = await fetch(dataUrl(path));
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

export async function fetchCitations(): Promise<import('../types/citation').CitationsData> {
  const res = await fetch(dataUrl('citations.json'));
  if (!res.ok) throw new Error(`Failed to fetch citations: ${res.status}`);
  return res.json();
}

export function getTopicById(manifest: Manifest, topicId: string): TopicManifestEntry | undefined {
  return manifest.topics.find(t => t.id === topicId);
}
