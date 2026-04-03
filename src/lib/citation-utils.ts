import type { Citation, CitationWithStats } from '../types/citation';

/**
 * Compute runtime stats for a citation
 */
export function enrichCitation(citation: Citation): CitationWithStats {
  const uniqueAis = new Set(citation.mentions.map(m => m.ai));
  const uniqueTopics = new Set(citation.mentions.map(m => m.topicId));

  // Consensus score: how many AI sources agree (support or mention)
  const supportCount = citation.mentions.filter(m => m.verdict === 'support').length;
  const totalMentions = citation.mentions.length;
  const consensusScore = totalMentions > 0 ? supportCount / totalMentions : 0;

  return {
    ...citation,
    aiCount: uniqueAis.size,
    topicCount: uniqueTopics.size,
    consensusScore,
  };
}

/**
 * Get DOI link
 */
export function doiLink(doi: string): string {
  return `https://doi.org/${doi}`;
}

/**
 * Format authors for display
 */
export function formatAuthors(authors: string[], maxShow = 3): string {
  if (authors.length <= maxShow) {
    return authors.join(', ');
  }
  return `${authors.slice(0, maxShow).join(', ')} et al.`;
}
