'use client';

import { InputField } from '@/components/InputField/InputField';
import { Button } from '@/components/Button/Button';
import { SearchResults } from '@/features/SearchBar/components/SearchResults';
import { ClickOutsideAwareComponent } from '@/features/ClickOutsideAwareComponent/ClickOutsideAwareComponent';
import { useSearchBar } from '@/features/SearchBar/hooks/useSearchBar';

export const SearchBar = () => {
  const { 
    focused, 
    setFocused,
    searchTerm,
    setSearchTerm,
    handleChange,
    handleKeyDown,
    handleSearch,
    synonyms,
    isLoading
  } = useSearchBar();

  return (
    <ClickOutsideAwareComponent 
      onOutsideClick={() => setFocused(false)}
      enabled={focused}
      className="relative flex gap-3 w-full max-w-2xl mx-auto"
    >
      <div className="relative flex-1">
        <InputField
          id="search-bar-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for synonyms..."
          onFocus={() => setFocused(true)}
        />
        {focused && (synonyms.length > 0 || isLoading) && (
          <SearchResults 
            isFocused={focused}
            setFocused={setFocused}
            results={synonyms} 
            setSearchTerm={setSearchTerm} 
            searchTerm={searchTerm}
            isLoading={isLoading}
          />
        )}
      </div>
      <Button onClick={handleSearch} variant="primary" loading={isLoading}>
        Search
      </Button>
    </ClickOutsideAwareComponent>
  );
};
