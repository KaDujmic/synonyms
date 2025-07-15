// This would be a file like a Repository/Context in a real world application I assume
import { Synonym } from "../types/Synonym.type";
import { dummySynonymsData } from "../data/dummy-synonyms";

type SynonymMap = Map<string, Set<string>>;

class SynonymService {
  private synonyms: SynonymMap;
  private caseMapping: Map<string, string>;

  constructor() {
    this.synonyms = new Map();
    this.caseMapping = new Map();
    
    this.initializeDummyData();
  }

  private initializeDummyData(): void {
    dummySynonymsData.forEach(({ word, synonyms }) => {
      this.createWord(word, synonyms);
    });
  }

  public createWord(word: string, synonyms: string[]): void {
    const allSynonymsSet = new Set<string>();

    synonyms.forEach(synonym => allSynonymsSet.add(synonym.toLowerCase()));
        
    for (const synonym of synonyms) {
      const normalizedSynonym = synonym.toLowerCase();
      const synonymSynonyms = this.synonyms.get(normalizedSynonym);
      
      if (synonymSynonyms) {
        synonymSynonyms.forEach(synonym => allSynonymsSet.add(synonym));
      }
    }
    
    this.createRelationshipsBetweenWords([word, ...allSynonymsSet]);
  }

  /**
   * Adds synonyms for a given word
   * Automatically links all synonyms bi-directionally
   * 
   * @param word - The word to add synonyms for
   * @param synonyms - The synonyms to add for the word
   */
  public addSynonyms(word: string, synonyms: string[]): void {
    const normalizedWord = word.toLowerCase();
    
    const existingSynonyms = this.synonyms.get(normalizedWord) || new Set();
    
    const allSynonyms = [...existingSynonyms, ...synonyms];    
    const allWords = [word, ...allSynonyms];

    const normalizedWords = allWords.map(w => {
      const normalized = w.toLowerCase();
      this.caseMapping.set(normalized, w);
      return normalized;
    });

    this.createRelationshipsBetweenWords(normalizedWords);
  }

    /**
   * Autocomplete function that finds words starting with the given prefix
   * 
   * @param prefix - The prefix to search for
   * @returns An array of synonym objects with words and slugs that start with the prefix
   */
  public searchSynonyms(prefix: string): Synonym[] {
    const normalizedPrefix = prefix.toLowerCase();
  		
    const results = Array.from(this.caseMapping.entries())
			.filter(([lowercaseWord]) => lowercaseWord.startsWith(normalizedPrefix))
			.map(([lowercaseWord, originalWord]) => ({
				word: originalWord,
				slug: lowercaseWord,
        synonyms: this.convertSynonymsSetToArray(this.synonyms.get(lowercaseWord) || new Set())
			}));
    
    return results;
  }

  /**
   * Retrieves all synonyms for a given word with slugs
   * 
   * @param slug - The word to get synonyms for
   * @returns An array of synonym objects with words and slugs
   */
  public getSynonym(slug: string): Synonym[] | null {
    const normalized = slug.toLowerCase();
    const result = this.synonyms.get(normalized);
    
    if (!result) return null;
    
    return this.convertSynonymsSetToArray(result);
  }

  /**
   * Searches for synonyms that are not already present for a given word
   * 
   * @param word - The word to check against
   * @param searchTerm - The search term to find potential synonyms
   * @returns Array of synonym objects that are not already synonyms of the word
   */
  public searchAvailableSynonyms(word: string, searchTerm: string): Synonym[] {
    const normalizedWord = word.toLowerCase();
    const normalizedSearchTerm = searchTerm.toLowerCase();
    
    const existingSynonyms = this.synonyms.get(normalizedWord) || new Set();
    
    const matchingWords = this.filterMatchingWords(normalizedSearchTerm, normalizedWord);

    const availableSynonyms = matchingWords.filter(synonym => 
      !existingSynonyms.has(synonym.slug)
    );

    return availableSynonyms;
  }

  /**
   * Gets a random word from the synonym database
   * 
   * @returns A random synonym object with word and slug, or null if no words exist
   */
  public getRandomSynonym(): Synonym | null {
    if (this.caseMapping.size === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * this.caseMapping.size);
    const [lowercaseWord, originalWord] = Array.from(this.caseMapping.entries())[randomIndex];
    
    return {
      word: originalWord,
      slug: lowercaseWord,
      synonyms: this.convertSynonymsSetToArray(this.synonyms.get(lowercaseWord) || new Set())
    };
  }


  private convertSynonymsSetToArray(synonyms: Set<string>): Synonym[] {
    const synonymsArray: Synonym[] = [];

    synonyms.forEach(synonym => {
      synonymsArray.push({
        word: this.caseMapping.get(synonym) || synonym,
        slug: synonym
      });
    });

    return synonymsArray;
  }

  private createRelationshipsBetweenWords(words: Set<string> | string[]): void {
    words.forEach(word1 => {
      if (!this.synonyms.has(word1.toLowerCase())) {
        this.synonyms.set(word1.toLowerCase(), new Set());
        this.caseMapping.set(word1.toLowerCase(), word1);
      }

      words.forEach(word2 => {
        if (word1 !== word2 && !this.synonyms.get(word1.toLowerCase())?.has(word2.toLowerCase())) {
          this.synonyms.get(word1.toLowerCase())?.add(word2.toLowerCase());
        }
      });
    });
  }

  private filterMatchingWords(normalizedSearchTerm: string, normalizedWord: string): Synonym[] {
    const matchingWords: Synonym[] = [];
    
    this.caseMapping.forEach(([lowercaseWord, originalWord]) => {
      if (lowercaseWord.startsWith(normalizedSearchTerm) && lowercaseWord !== normalizedWord) {
        matchingWords.push({
          word: originalWord,
          slug: lowercaseWord
        });
      }
    });

    return matchingWords;
  }
}

export default new SynonymService();