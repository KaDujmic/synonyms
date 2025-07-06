import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazySearchSynonymsQuery } from "../../../api/apiSlice";
import { useDebounce } from "../../../hooks/listeners/useDebounce";

export const useHandleSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const [searchSynonyms, { data: synonyms, isLoading, isSuccess }] = useLazySearchSynonymsQuery();

  const handleInput = (value: string) => {
    if (value.trim()) {
      searchSynonyms(value.trim());
    }
  };

  const {
    debounce: debounceRequest,
  } = useDebounce(handleInput, 300, [searchSynonyms]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setFocused(false);
      navigate(`/synonym/${searchTerm.trim()}`);
    }
  };

  const handleChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim()) {
      debounceRequest(value.trim());
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    focused,
    setFocused,
    handleChange,
    synonyms,
    isLoading,
    isSuccess
  }
};