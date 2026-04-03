import type { AiSource } from '../lib/constants';

export type Verdict = 'support' | 'mention' | 'contrast' | 'conflict';

export interface Mention {
  topicId: string;
  ai: AiSource;
  verdict: Verdict;
}

export interface Citation {
  id: string;
  citeKey: string;
  title: string;
  authors: string[];
  year: number;
  type: 'journal' | 'conference' | 'book' | 'thesis' | 'preprint' | 'report' | 'other';
  venue: string;
  doi?: string;
  url?: string;
  localPdf?: string;
  tags: string[];
  notes?: string;
  mentions: Mention[];
}

export interface CitationsData {
  version: number;
  updatedAt: string;
  items: Citation[];
}

/** Runtime computed fields */
export interface CitationWithStats extends Citation {
  aiCount: number;
  topicCount: number;
  consensusScore: number;
}
