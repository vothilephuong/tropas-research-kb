import type { AiSource } from '../lib/constants';

export interface TopicManifestEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'draft' | 'in-progress' | 'complete';
  created: string;
  path: string;
  files: Partial<Record<AiSource, string>>;
  assets: string[];
}

export interface Manifest {
  generated_at: string;
  topics: TopicManifestEntry[];
}
