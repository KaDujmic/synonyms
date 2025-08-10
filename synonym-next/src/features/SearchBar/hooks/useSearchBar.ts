import { useState } from 'react';
import { Synonym } from '@/types/Synonym.type';

// Comprehensive dummy data for testing
const dummySynonyms = [
  // Happy synonyms
  { word: 'happy', slug: 'happy' },
  { word: 'joyful', slug: 'joyful' },
  { word: 'cheerful', slug: 'cheerful' },
  { word: 'delighted', slug: 'delighted' },
  { word: 'pleased', slug: 'pleased' },
  { word: 'content', slug: 'content' },
  { word: 'satisfied', slug: 'satisfied' },
  { word: 'elated', slug: 'elated' },
  { word: 'thrilled', slug: 'thrilled' },
  { word: 'excited', slug: 'excited' },
  { word: 'ecstatic', slug: 'ecstatic' },
  { word: 'overjoyed', slug: 'overjoyed' },
  { word: 'blissful', slug: 'blissful' },
  { word: 'euphoric', slug: 'euphoric' },
  { word: 'radiant', slug: 'radiant' },
  
  // Sad synonyms
  { word: 'sad', slug: 'sad' },
  { word: 'unhappy', slug: 'unhappy' },
  { word: 'depressed', slug: 'depressed' },
  { word: 'melancholy', slug: 'melancholy' },
  { word: 'gloomy', slug: 'gloomy' },
  { word: 'sorrowful', slug: 'sorrowful' },
  { word: 'miserable', slug: 'miserable' },
  { word: 'heartbroken', slug: 'heartbroken' },
  { word: 'dejected', slug: 'dejected' },
  { word: 'despondent', slug: 'despondent' },
  
  // Beautiful synonyms
  { word: 'beautiful', slug: 'beautiful' },
  { word: 'gorgeous', slug: 'gorgeous' },
  { word: 'stunning', slug: 'stunning' },
  { word: 'magnificent', slug: 'magnificent' },
  { word: 'breathtaking', slug: 'breathtaking' },
  { word: 'elegant', slug: 'elegant' },
  { word: 'graceful', slug: 'graceful' },
  { word: 'lovely', slug: 'lovely' },
  { word: 'charming', slug: 'charming' },
  { word: 'attractive', slug: 'attractive' },
  { word: 'handsome', slug: 'handsome' },
  { word: 'pretty', slug: 'pretty' },
  { word: 'appealing', slug: 'appealing' },
  
  // Big synonyms
  { word: 'big', slug: 'big' },
  { word: 'large', slug: 'large' },
  { word: 'huge', slug: 'huge' },
  { word: 'enormous', slug: 'enormous' },
  { word: 'massive', slug: 'massive' },
  { word: 'gigantic', slug: 'gigantic' },
  { word: 'colossal', slug: 'colossal' },
  { word: 'immense', slug: 'immense' },
  { word: 'tremendous', slug: 'tremendous' },
  { word: 'substantial', slug: 'substantial' },
  { word: 'considerable', slug: 'considerable' },
  { word: 'significant', slug: 'significant' },
  
  // Small synonyms
  { word: 'small', slug: 'small' },
  { word: 'tiny', slug: 'tiny' },
  { word: 'little', slug: 'little' },
  { word: 'miniature', slug: 'miniature' },
  { word: 'petite', slug: 'petite' },
  { word: 'compact', slug: 'compact' },
  { word: 'minute', slug: 'minute' },
  { word: 'microscopic', slug: 'microscopic' },
  { word: 'diminutive', slug: 'diminutive' },
  { word: 'minuscule', slug: 'minuscule' },
  { word: 'slight', slug: 'slight' },
  { word: 'modest', slug: 'modest' },
  
  // Fast synonyms
  { word: 'fast', slug: 'fast' },
  { word: 'quick', slug: 'quick' },
  { word: 'rapid', slug: 'rapid' },
  { word: 'swift', slug: 'swift' },
  { word: 'speedy', slug: 'speedy' },
  { word: 'hasty', slug: 'hasty' },
  { word: 'brisk', slug: 'brisk' },
  { word: 'fleet', slug: 'fleet' },
  { word: 'agile', slug: 'agile' },
  { word: 'nimble', slug: 'nimble' },
  { word: 'prompt', slug: 'prompt' },
  { word: 'immediate', slug: 'immediate' },
  { word: 'instant', slug: 'instant' },
  
  // Smart synonyms
  { word: 'smart', slug: 'smart' },
  { word: 'intelligent', slug: 'intelligent' },
  { word: 'clever', slug: 'clever' },
  { word: 'brilliant', slug: 'brilliant' },
  { word: 'wise', slug: 'wise' },
  { word: 'genius', slug: 'genius' },
  { word: 'sharp', slug: 'sharp' },
  { word: 'astute', slug: 'astute' },
  { word: 'shrewd', slug: 'shrewd' },
  { word: 'cunning', slug: 'cunning' },
  { word: 'resourceful', slug: 'resourceful' },
  { word: 'ingenious', slug: 'ingenious' },
  { word: 'creative', slug: 'creative' },
  { word: 'innovative', slug: 'innovative' }
];

export const useSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  // Simulate search with dummy data
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter dummy data based on search term
    const filteredSynonyms = dummySynonyms.filter(synonym =>
      synonym.word.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setSynonyms(filteredSynonyms);
    setIsLoading(false);
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    
    // Auto-search as user types (with debounce)
    if (value.trim()) {
      const timeoutId = setTimeout(() => {
        const filteredSynonyms = dummySynonyms.filter(synonym =>
          synonym.word.toLowerCase().includes(value.toLowerCase())
        );
        setSynonyms(filteredSynonyms);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSynonyms([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    focused,
    setFocused,
    isLoading,
    setIsLoading,
    synonyms,
    handleChange,
    handleKeyDown,
    handleSearch
  }
}