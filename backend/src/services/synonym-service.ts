// This would be a file like a Repository in a real world application I assume
import { SynonymClientResponse } from "../types/SynonymClientResponse.type";

type SynonymMap = Map<string, Set<string>>;

class SynonymService {
  private synonyms: SynonymMap;
  private caseMapping: Map<string, string>;

  constructor() {
    this.synonyms = new Map();
    this.caseMapping = new Map();
    
    // Initialize with dummy data
    this.initializeDummyData();
  }

  /**
   * Initializes the service with dummy data for testing
   */
  private initializeDummyData(): void {
    const dummyData = [
      { word: "happy", synonyms: ["joyful", "cheerful", "glad", "pleased", "content"] },
      { word: "big", synonyms: ["large", "huge", "enormous", "massive", "gigantic"] },
      { word: "fast", synonyms: ["quick", "rapid", "swift", "speedy", "hasty"] },
      { word: "beautiful", synonyms: ["gorgeous", "stunning", "lovely", "attractive", "pretty"] },
      { word: "smart", synonyms: ["intelligent", "clever", "bright", "brilliant", "wise"] },
      { word: "strong", synonyms: ["powerful", "mighty", "robust", "sturdy", "tough"] },
      { word: "small", synonyms: ["tiny", "little", "miniature", "petite", "compact"] },
      { word: "good", synonyms: ["excellent", "great", "fine", "superior", "outstanding"] },
      { word: "bad", synonyms: ["terrible", "awful", "horrible", "dreadful", "poor"] },
      { word: "new", synonyms: ["fresh", "recent", "modern", "current", "latest"] }
    ];

    dummyData.forEach(({ word, synonyms }) => {
      this.addSynonyms(word, synonyms);
    });
  }

	// Dont know if this is good ... 2N^2 complexity, but for now I will leave it like this and revisit if i think of a better way
	// The idea is to save the original case of the word and use it to return the synonyms in the original case
	// But since im doing internal memory with maps ... I dont know if this is the best way to do it
  /**
   * Adds synonyms for a given word
   * Automatically links all synonyms bi-directionally
   * 
   * @param word - The word to add synonyms for
   * @param synonyms - The synonyms to add for the word
   */
  public addSynonyms(word: string, synonyms: string[]): void {
    const allWords = [word, ...synonyms];
    
    // Store original case mapping and normalize for internal operations
    const normalizedWords = allWords.map(w => {
      const normalized = w.toLowerCase();
      this.caseMapping.set(normalized, w);
      return normalized;
    });

    for (const word1 of normalizedWords) {
      if (!this.synonyms.has(word1)) {
        this.synonyms.set(word1, new Set());
      }

      for (const word2 of normalizedWords) {
        if (word1 !== word2) {
          this.synonyms.get(word1)?.add(word2);
        }
      }
    }
  }

    /**
   * Autocomplete function that finds words starting with the given prefix
   * 
   * @param prefix - The prefix to search for
   * @returns An array of synonym objects with words and links that start with the prefix
   */
  public searchSynonyms(prefix: string): Array<{ word: string; link: string }> {
    const normalizedPrefix = prefix.toLowerCase();
  		
    // Search through all words in caseMapping to find matches
    const results = Array.from(this.caseMapping.entries())
			.filter(([lowercaseWord]) => lowercaseWord.startsWith(normalizedPrefix))
			.map(([lowercaseWord, originalWord]) => ({
				word: originalWord,
				link: `/synonym/${encodeURIComponent(originalWord)}`
			}));
    
    return results;
  }

  /**
   * Retrieves all synonyms for a given word with links
   * 
   * @param word - The word to get synonyms for
   * @returns An array of synonym objects with words and links
   */
  public getSynonym(word: string): Array<{ word: string; link: string }> {
    const normalized = word.toLowerCase();
    const result = this.synonyms.get(normalized);
    
    if (!result) {
      return [];
    }
    
    return Array.from(result).map(synonym => ({
      word: this.caseMapping.get(synonym) || synonym,
      link: `/synonym/${encodeURIComponent(synonym)}`
    }));
  }


/**
 * Retrieves synonym objects for a single word
 * 
 * @param searchTerm - The word to get synonyms for
 * @returns Object containing word and its synonyms with links
 */
public getSynonymObjects(searchTerm: string): SynonymClientResponse {
	const synonyms = this.getSynonym(searchTerm);
	const synonymObjects = synonyms.map(synonym => ({
		word: synonym.word,
		link: synonym.link
	}));
	
	return {
		word: searchTerm,
		synonyms: synonymObjects
	};
}
}

export default new SynonymService();