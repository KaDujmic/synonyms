// This would be a file like a Repository in a real world application I assume
import { Synonym } from "../types/Synonym.type";
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
      // Happy - joyful
      { word: "happy", synonyms: ["joyful", "cheerful", "glad"] }, // pleased
      
      // Big - large
      { word: "big", synonyms: ["large", "huge", "enormous"] }, // massive
      
      // Small - tiny
      { word: "small", synonyms: ["tiny", "little"] }, // miniature, petite
      
      // Fast - quick
      { word: "fast", synonyms: ["quick", "rapid"] }, // swift, speedy
      
      // Slow - sluggish
      { word: "slow", synonyms: ["sluggish", "leisurely"] }, // gradual
      
      // Beautiful - pretty
      { word: "beautiful", synonyms: ["pretty", "gorgeous"] }, // stunning, lovely
      
      // Ugly - hideous
      { word: "ugly", synonyms: ["hideous", "repulsive"] }, // unsightly
      
      // Smart - intelligent
      { word: "smart", synonyms: ["intelligent", "clever"] }, // bright, wise
      
      // Stupid - foolish
      { word: "stupid", synonyms: ["foolish", "dumb"] }, // ignorant
      
      // Strong - powerful
      { word: "strong", synonyms: ["powerful", "mighty"] }, // robust, sturdy
      
      // Weak - feeble
      { word: "weak", synonyms: ["feeble", "frail"] }, // delicate
      
      // Hot - warm
      { word: "hot", synonyms: ["warm", "heated"] }, // scorching
      
      // Cold - chilly
      { word: "cold", synonyms: ["chilly", "freezing"] }, // frigid
      
      // Good - excellent
      { word: "good", synonyms: ["excellent", "great"] }, // wonderful, fantastic
      
      // Bad - terrible
      { word: "bad", synonyms: ["terrible", "awful"] }, // horrible, dreadful
      
      // New - fresh
      { word: "new", synonyms: ["fresh", "recent"] }, // modern
      
      // Old - ancient
      { word: "old", synonyms: ["ancient", "aged"] }, // elderly
      
      // Clean - spotless
      { word: "clean", synonyms: ["spotless", "pristine"] }, // immaculate
      
      // Dirty - filthy
      { word: "dirty", synonyms: ["filthy", "soiled"] }, // grimy
      
      // Loud - noisy
      { word: "loud", synonyms: ["noisy", "boisterous"] }, // clamorous
      
      // Quiet - silent
      { word: "quiet", synonyms: ["silent", "hushed"] }, // peaceful
      
      // Bright - luminous
      { word: "bright", synonyms: ["luminous", "radiant"] }, // brilliant
      
      // Dark - gloomy
      { word: "dark", synonyms: ["gloomy", "dim"] }, // shadowy
      
      // Soft - gentle
      { word: "soft", synonyms: ["gentle", "tender"] }, // mild
      
      // Hard - solid
      { word: "hard", synonyms: ["solid", "firm", "rigid"] } // stiff
    ];

    dummyData.forEach(({ word, synonyms }) => {
      this.addSynonyms(word, synonyms);
    });
  }

	// Dont know if this is good ... 2N^2 complexity, but for now I will leave it like this and revisit if i think of a better way
	// The idea is to save the original case of the word and use it to return the synonyms in the original case
	// But since im doing internal memory with maps ... I dont know if this is the best way to do it

	// Given some thoughts
	// I decided that storing the word is less important than searching
	// Assuming if this was a prod setting, we would seed the data on intial deploy
	// And add words later on if some are missed

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
				slug: lowercaseWord
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
      slug: synonym
    }));
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
      synonyms: synonymObjects
    };
  }
}

export default new SynonymService();