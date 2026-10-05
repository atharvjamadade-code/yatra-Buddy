import knowledgeJson from '../data/knowledge.json';

export interface KnowledgeEntry {
  id: string;
  category: string;
  title: string;
  keywords: string[];
  answer: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface BuddyAnswer {
  answer: string;
  sourceLabel?: string;
  sourceUrl?: string;
  confidence: number;
  hasVettedAnswer: boolean;
  isLlmRephrased?: boolean;
  category?: string;
  title?: string;
}

export interface BuddyEngine {
  answer(question: string, useLlmRephrase?: boolean): Promise<BuddyAnswer>;
}

// Stop words to discount in IDF scoring
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'was',
  'were', 'i', 'my', 'me', 'you', 'your', 'we', 'they', 'it', 'its', 'can', 'do', 'does',
  'how', 'what', 'when', 'where', 'which', 'who', 'why', 'should', 'would', 'could'
]);

function normalizeWord(word: string): string {
  let w = word.toLowerCase().trim();
  // Simple suffix stripping for plurals
  if (w.endsWith('ies') && w.length > 4) {
    w = w.slice(0, -3) + 'y';
  } else if (w.endsWith('es') && w.length > 4 && !w.endsWith('ches') && !w.endsWith('shes')) {
    w = w.slice(0, -2);
  } else if (w.endsWith('s') && w.length > 3 && !w.endsWith('ss')) {
    w = w.slice(0, -1);
  }
  return w;
}

export class RetrievalBuddyEngine implements BuddyEngine {
  private entries: KnowledgeEntry[];
  private idfMap: Map<string, number> = new Map();
  private readonly threshold: number = 4.5;

  constructor(customEntries?: KnowledgeEntry[]) {
    this.entries = customEntries || (knowledgeJson as KnowledgeEntry[]);
    this.calculateIdf();
  }

  private calculateIdf() {
    const totalDocs = this.entries.length;
    const docFrequency: Map<string, number> = new Map();

    for (const entry of this.entries) {
      const uniqueWordsInDoc = new Set<string>();

      // Collect all words from title, keywords and answer
      const docText = `${entry.title} ${entry.keywords.join(' ')} ${entry.answer}`.toLowerCase();
      const tokens = docText.split(/[\s,?.!-]+/).filter(t => t.length > 2);

      for (const t of tokens) {
        uniqueWordsInDoc.add(normalizeWord(t));
      }

      for (const word of uniqueWordsInDoc) {
        docFrequency.set(word, (docFrequency.get(word) || 0) + 1);
      }
    }

    // Compute IDF = log(1 + totalDocs / docFrequency)
    for (const [word, count] of docFrequency.entries()) {
      const idf = Math.log(1 + totalDocs / (count + 0.5));
      this.idfMap.set(word, idf);
    }
  }

  public async answer(question: string, useLlmRephrase = false): Promise<BuddyAnswer> {
    const cleanQ = question.trim().toLowerCase();
    if (!cleanQ) {
      return {
        answer: 'Please ask any question about travel in India, visas, scams, auto fares, or safety.',
        confidence: 0,
        hasVettedAnswer: false
      };
    }

    const queryWords = cleanQ
      .split(/[\s,?.!-]+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w))
      .map(normalizeWord);

    if (queryWords.length === 0) {
      return {
        answer: 'I did not catch specific keywords. Please ask about visas, FRRO, hotel scams, auto meters, or water safety.',
        confidence: 0,
        hasVettedAnswer: false
      };
    }

    let bestScore = 0;
    let bestEntry: KnowledgeEntry | null = null;

    for (const entry of this.entries) {
      let score = 0;
      const entryKeywords = entry.keywords.map(normalizeWord);
      const titleWords = entry.title.toLowerCase().split(/\s+/).map(normalizeWord);

      for (const qWord of queryWords) {
        const idfWeight = this.idfMap.get(qWord) || 1.0;

        // Exact match in curated keywords array (high value)
        if (entryKeywords.includes(qWord)) {
          score += 6.0 * idfWeight;
        }

        // Title match
        if (titleWords.includes(qWord)) {
          score += 4.5 * idfWeight;
        }

        // Substring match in body
        if (entry.answer.toLowerCase().includes(qWord)) {
          score += 1.5 * idfWeight;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    // Refuse unknown questions when score is below threshold
    if (!bestEntry || bestScore < this.threshold) {
      return {
        answer: "I do not have a vetted answer for this in my offline knowledge base. To stay safe and avoid misguidance, please consult official Indian Government portals (such as indianvisaonline.gov.in or tourism.gov.in) or ask your registered hotel desk. I will never invent travel advice.",
        sourceLabel: "Official Government Portals",
        sourceUrl: "https://indianvisaonline.gov.in",
        confidence: bestScore,
        hasVettedAnswer: false
      };
    }

    let finalAnswer = bestEntry.answer;

    // Simulated On-Device LLM Rephraser (1B-3B MediaPipe spec)
    // "The LLM may only rephrase text retrieved from the knowledge base and must never be asked when retrieval finds nothing."
    if (useLlmRephrase) {
      finalAnswer = `[On-Device AI Summary]: Based on official guidelines for "${bestEntry.title}":\n\n${bestEntry.answer}`;
    }

    return {
      answer: finalAnswer,
      sourceLabel: bestEntry.sourceLabel,
      sourceUrl: bestEntry.sourceUrl,
      confidence: Math.min(100, Math.round(bestScore * 10)),
      hasVettedAnswer: true,
      isLlmRephrased: useLlmRephrase,
      category: bestEntry.category,
      title: bestEntry.title
    };
  }
}
