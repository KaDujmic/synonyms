// This would be a file like a Repository in a real world application I assume
import { Synonym } from "../types/Synonym.type";
import { SynonymClientResponse } from "../types/SynonymClientResponse.type";
import { dummySynonymsData } from "../data/dummy-synonyms";

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
    dummySynonymsData.forEach(({ word, synonyms }) => {
      this.createWord(word, synonyms);
    });
  }

	// Dont know if this is good ... O(n^2 + m) complexity, but for now I will leave it like this and revisit if i think of a better way
	// The idea is to save the original case of the word and use it to return the synonyms in the original case
	// But since im doing internal memory with maps ... I dont know if this is the best way to do it

	// Given some thoughts
	// I decided that storing the word is less important than searching
	// Assuming if this was a prod setting, we would seed the data on intial deploy
	// And add words later on if some are missed

  public createWord(word: string, synonyms: string[]): void {
    // Collect ALL synonyms recursively - including synonyms of synonyms
    const allSynonymsSet = new Set<string>();

    // Add the provided synonyms
    synonyms.forEach(synonym => allSynonymsSet.add(synonym.toLowerCase()));
        
    // Add synonyms of each provided synonym (recursive gathering)
    for (const synonym of synonyms) {
      const normalizedSynonym = synonym.toLowerCase();
      const synonymSynonyms = this.synonyms.get(normalizedSynonym);
      if (synonymSynonyms) {
        Array.from(synonymSynonyms).forEach(synonym => allSynonymsSet.add(synonym));
      }
    }
    
    // Create the complete list of all words (original word + all synonyms)
    const allWords = [word, ...Array.from(allSynonymsSet)];

    // Create transitive relationships - each word gets all other words as synonyms
    allWords.forEach(word1 => {
      if (!this.synonyms.has(word1.toLowerCase())) {
        this.synonyms.set(word1.toLowerCase(), new Set());
        this.caseMapping.set(word1.toLowerCase(), word1);
      }

      allWords.forEach(word2 => {
        if (word1 !== word2 && !this.synonyms.get(word1.toLowerCase())?.has(word2.toLowerCase())) {
          this.synonyms.get(word1.toLowerCase())?.add(word2.toLowerCase());
        }
      });
    });
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
    
    // Get all existing synonyms for the word
    const existingSynonyms = this.synonyms.get(normalizedWord) || new Set();
    const existingSynonymsArray = Array.from(existingSynonyms);
    
    // Combine existing synonyms with new synonyms
    const allSynonyms = [...existingSynonymsArray, ...synonyms];    
    // Create the complete list of all words (original word + all synonyms)
    const allWords = [word, ...allSynonyms];

    // Store original case mapping and normalize for internal operations
    const normalizedWords = allWords.map(w => {
      const normalized = w.toLowerCase();
      this.caseMapping.set(normalized, w);
      return normalized;
    });

    // double for loop to add new words if they are present in the synonyms array but not memorised
    // first loop just adds the word to the map if it is not present
    // second loop adds the synonyms to the word
    // Covers the transitive relationship, 
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
   * @returns An array of synonym objects with words and slugs that start with the prefix
   */
  public searchSynonyms(prefix: string): Synonym[] {
    const normalizedPrefix = prefix.toLowerCase();
  		
    // Search through all words in caseMapping to find matches
    const results = Array.from(this.caseMapping.entries())
			.filter(([lowercaseWord]) => lowercaseWord.startsWith(normalizedPrefix))
			.map(([lowercaseWord, originalWord]) => ({
				word: originalWord,
				slug: lowercaseWord,
        // Could be done maybe with only this.synonyms but i want to return the original word
        synonyms: Array.from(this.synonyms.get(lowercaseWord) || []).map(synonym => ({
          word: this.caseMapping.get(synonym) || synonym,
          slug: synonym
        }))
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
    
    if (!result) {
      return null;
    }
    
    return Array.from(result).map(synonym => ({
      word: this.caseMapping.get(synonym) || synonym,
      slug: synonym
    }));
  }

  /**
   * Gets synonyms for a word without recursion (to avoid infinite loops)
   * 
   * @param word - The word to get synonyms for
   * @returns Array of synonym objects with words and slugs
   */
  private getSynonymsForWord(word: string): Synonym[] | null {
    const normalized = word.toLowerCase();
    const result = this.synonyms.get(normalized);
    
    if (!result) {
      return null;
    }
    
    return Array.from(result).map(synonym => ({
      word: this.caseMapping.get(synonym) || synonym,
      slug: synonym,
      synonyms: Array.from(this.synonyms.get(synonym) || []).map(synonym => ({
        word: this.caseMapping.get(synonym) || synonym,
        slug: synonym
      }))
    }));
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
    
    // Get existing synonyms for the word
    const existingSynonyms = this.synonyms.get(normalizedWord) || new Set();
    
    // Search for all words that match the search term
    const matchingWords = Array.from(this.caseMapping.entries())
      .filter(([lowercaseWord, originalWord]) => 
        lowercaseWord.startsWith(normalizedSearchTerm) && 
        lowercaseWord !== normalizedWord
      )
      .map(([lowercaseWord, originalWord]) => ({
        word: originalWord,
        slug: lowercaseWord
      }));

    // Filter out words that are already synonyms of the given word
    const availableSynonyms = matchingWords.filter(synonym => 
      !existingSynonyms.has(synonym.slug)
    );

    return availableSynonyms;
  }


  /**
   * Retrieves synonym objects for a single word
   * 
   * @param searchTerm - The word to get synonyms for
   * @returns Object containing word and its synonyms with slugs
   */
  public getSynonymObjects(searchTerm: string): SynonymClientResponse | null {
    const synonyms = this.getSynonym(searchTerm);

    if (!synonyms) {
      return null;
    }

    const synonymObjects = synonyms.map(synonym => ({
      word: synonym.word,
      slug: synonym.slug,
      synonyms: this.getSynonymsForWord(synonym.slug)
    }));
    
    return {
      word: searchTerm,
      synonyms: synonymObjects.map(synonym => ({
        word: synonym.word,
        slug: synonym.slug,
        synonyms: synonym.synonyms?.map(s => ({
          word: s.word,
          slug: s.slug
        }))
      }))
    };
  }

  /**
   * Gets a random word from the synonym database
   * 
   * @returns A random synonym object with word and slug, or null if no words exist
   */
  public getRandomSynonym(): Synonym | null {
    const allWords = Array.from(this.caseMapping.entries());

    console.log(allWords);
    
    if (allWords.length === 0) {
      return null;
    }
    
    // Get a random word from the caseMapping
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const [lowercaseWord, originalWord] = allWords[randomIndex];
    
    return {
      word: originalWord,
      slug: lowercaseWord,
      synonyms: Array.from(this.synonyms.get(lowercaseWord) || []).map(synonym => {
        return {
          word: this.caseMapping.get(synonym) || synonym,
          slug: synonym
        }
      })
    };
  }

  
}

export default new SynonymService();