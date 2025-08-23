import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Synonym } from '@/types/Synonym.type';
import { useDebounce } from '@/hooks/useDebounce';
import { synonymApi } from '@/api/synonymApi';
import { SearchSynonymResponse } from '@/api/types/SearchSynonymResponse';

export const useSearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Handle API search
  const handleApiSearch = async (value: string) => {
    if (!value.trim()) {
      setSynonyms([]);
      setSearchError(null);
      return;
    }

    try {
      setSearchError(null);
      const response: SearchSynonymResponse = await synonymApi.searchSynonyms(value.trim());
      setSynonyms(response.data.synonyms);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Failed to search synonyms');
      setSynonyms([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const { debounce: debounceSearch } = useDebounce(handleApiSearch, 300, []);

  // Navigate to synonym page
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Navigate to the synonym page
      router.push(`/synonym/${searchTerm.trim()}`);
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    debounceSearch(value.trim());
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
    searchError,
    handleChange,
    handleKeyDown,
    handleSearch
  }
}