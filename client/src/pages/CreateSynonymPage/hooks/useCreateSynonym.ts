import { useEffect, useState } from 'react';
import { useCreateSynonymMutation, useLazySearchAvailableSynonymsQuery } from '../../../api/apiSlice';
import { useDebounce } from '../../../hooks/listeners/useDebounce';
import type { Synonym } from '../../../types/Synonym.type';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useCreateSynonym = () => {
  const [searchParams] = useSearchParams();
  const [word, setWord] = useState(searchParams.get('word') || '');
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);
  const [currentSynonym, setCurrentSynonym] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const [searchSynonyms, { data: searchResultsRaw, isLoading }] = useLazySearchAvailableSynonymsQuery();
  const [ createSynonym, { isLoading: isCreating }] = useCreateSynonymMutation();
  const [filteredResults, setFilteredResults] = useState<Synonym[]>([]);

  useEffect(() => {
    setWord(searchParams.get('word') || '');
    setCurrentSynonym('');
    setSynonyms([]);
    setFilteredResults([]);
  }, [searchParams]);


  const handleInput = (searchTerm: string) => {
    if (searchTerm.trim()) {
      searchSynonyms({ word: '', searchTerm: searchTerm.trim() })
        .then((response: any) => {
          handleFilteredResults(synonyms, response?.data?.data?.synonyms);
        });
    } else {
      setFilteredResults([]);
    }
  };

  const {
    debounce: debounceRequest,
  } = useDebounce(handleInput, 300, [searchSynonyms, synonyms]);

  const handleWordChange = (newWord: string) => {
    setWord(newWord);
  };

  const handleSynonymChange = (newSynonym: string, closeSuggestions: boolean = false) => {
    setCurrentSynonym(newSynonym);
    if (newSynonym.trim()) {
      debounceRequest(newSynonym.trim());
    }
    if (closeSuggestions) {
      setIsFocused(false);
    }
  };

  const addSynonym = (synonym: Synonym) => {
    const exists = synonyms.some(s => s.slug === synonym.slug);
    if (!exists) {
      setSynonyms([...synonyms, synonym]);
      setCurrentSynonym('');
      setIsFocused(false);
      handleFilteredResults([...synonyms, synonym], searchResultsRaw?.data?.synonyms);
    }
  };

  const handleFilteredResults = (synonyms: Synonym[], searchResults?: Synonym[]) => {
    const allWords = new Set(
      synonyms.flatMap(s => [s.word, ...(s.synonyms || [])]).map(w => w.toLowerCase())
    );

    const apiResults: Synonym[] = searchResults || [];
    const filtered = apiResults.filter(
      result => !allWords.has(result.word.toLowerCase())
    );

    setFilteredResults(filtered);
  };

  const removeSynonym = (synonymSlug: string) => {
    setSynonyms(synonyms.filter(s => s.slug !== synonymSlug));
  };

  const handleSave = () => {
    if (word.trim() && synonyms.length > 0) {
      const synonymWords = synonyms.map(s => s.word);
      createSynonym({ word: word.trim(), synonyms: synonymWords }).unwrap().then((response) => {
        navigate(`/synonym/${response.data.word}`);
      });
    }
  };

  return {
    word,
    synonyms,
    currentSynonym,
    isFocused,
    searchResults: filteredResults,
    isLoading,
    handleWordChange,
    handleSynonymChange,
    addSynonym,
    removeSynonym,
    setIsFocused,
    handleSave,
    isCreating
  };
}; 