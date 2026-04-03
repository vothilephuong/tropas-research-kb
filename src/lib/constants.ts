// src/lib/constants.ts

/** Thứ tự hiển thị AI — dùng ở comparator, search, sidebar badge, manifest.
 *  Đổi ở đây = đổi toàn app. */
export const AI_ORDER = ['claude', 'chatgpt', 'gemini', 'perplexity'] as const;
export type AiSource = (typeof AI_ORDER)[number];

export const AI_LABELS: Record<AiSource, string> = {
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  gemini: 'Gemini',
  perplexity: 'Perplexity',
};

export const AI_COLORS: Record<AiSource, string> = {
  claude: '#D97706',   // amber
  chatgpt: '#10B981',  // emerald
  gemini: '#3B82F6',   // blue
  perplexity: '#8B5CF6', // violet
};
