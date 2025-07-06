
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { ClickOutsideAwareComponent } from '../../clickOutsideAwareComponent/components/ClickOutsideAwareComponent';
import { useHandleSearch } from '../hooks/useHandleSearch';
import '../styles/search-bar.less';
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
    isSuccess
  } = useHandleSearch();

  return (
      <ClickOutsideAwareComponent 
        className="search-bar"
        onOutsideClick={() => setFocused(false)}
      >
        <InputField
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for synonyms..."
          onFocus={() => setFocused(true)}
        />
        <Button onClick={handleSearch} className="button-primary">
          Search
        </Button>
        {isSuccess && synonyms && synonyms.data.synonyms.length > 0 && focused && (
          <SearchResults 
            setFocused={setFocused}
            results={synonyms?.data?.synonyms} 
            setSearchTerm={setSearchTerm} 
          />
        )}
      </ClickOutsideAwareComponent>
  );
}; 