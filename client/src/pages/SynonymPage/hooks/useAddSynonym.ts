import { useState } from 'react';
import { useAddSynonymsToWordMutation, useLazySearchAvailableSynonymsQuery } from '../../../api/apiSlice';
import { useDebounce } from '../../../hooks/listeners/useDebounce';
import { useParams } from 'react-router-dom';

export const useAddSynonym = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [newSynonym, setNewSynonym] = useState('');
  const params = useParams();
  const [searchSynonyms, { data: searchResults, isLoading }] = useLazySearchAvailableSynonymsQuery();
  const [addSynonyms] = useAddSynonymsToWordMutation();

  const handleInput = (value: string) => {
    if (value.trim()) {
      if (params.searchTerm) {
        searchSynonyms({ word: params.searchTerm, searchTerm: value.trim() });
      }
    }
  };

  const {
    debounce: debounceRequest,
  } = useDebounce(handleInput, 300, [searchSynonyms]);

  const handleAddClick = () => {
    setIsAdding(true);
    setNewSynonym('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewSynonym('');
  };

  const handleInputChange = (value: string, closeSuggestions: boolean = false) => {
    setNewSynonym(value);
    if (value.trim()) {
      debounceRequest(value.trim());
    }
    if (closeSuggestions) {
      setIsFocused(false);
    }
  };

  const handleSave = () => {
    if (newSynonym.trim()) {
      setIsAdding(false);
      setNewSynonym('');
      if (params.searchTerm) {
        addSynonyms({ word: params.searchTerm, synonyms: [newSynonym] });
      }
    }
  };

  return {
    isAdding,
    newSynonym,
    searchResults: searchResults?.data?.synonyms || [],
    isLoading,
    handleAddClick,
    handleCancel,
    handleInputChange,
    handleSave,
    isFocused,
    setIsFocused
  };
}; 