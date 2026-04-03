import type { AiSource } from '../lib/constants';

export interface TopicMeta {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'draft' | 'in-progress' | 'complete';
  created: string;
  files: Partial<Record<AiSource, string>>;
}
