
import '../styles/search-bar.less';
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { ClickOutsideAwareComponent } from '../../ClickOutsideAwareComponent/components/ClickOutsideAwareComponent';
import { useHandleSearch } from '../hooks/useHandleSearch';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
  const { 
    searchTerm,
    handleSearch,
    focused,
    setSearchTerm,
    setFocused,
    handleChange,
    synonyms,
    isSuccess,
    isLoading
  } = useHandleSearch();

  return (
      <ClickOutsideAwareComponent 
        className="search-bar"
        onOutsideClick={() => setFocused(false)}
      >
        <div className="search-bar-input">
          <InputField
            id="search-bar-input"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search for synonyms..."
            onFocus={() => setFocused(true)}
          />
          {isSuccess && synonyms  && focused && (
            <SearchResults 
              setFocused={setFocused}
              results={synonyms?.data?.synonyms} 
              setSearchTerm={setSearchTerm} 
              searchTerm={searchTerm}
              isLoading={isLoading}
            />
          )}
        </div>
        <Button onClick={handleSearch} className="button-primary">
          Search
        </Button>
        
      </ClickOutsideAwareComponent>
  );
}; 