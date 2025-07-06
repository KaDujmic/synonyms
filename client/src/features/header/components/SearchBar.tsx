
import { Button } from '../../../components/Button';
import { InputField } from '../../../components/InputField';
import { useHandleSearch } from '../hooks/useHandleSearch';
import '../styles/search-bar.less';

export const SearchBar = () => {
  const { 
    searchTerm,
    setSearchTerm,
    handleSearch
  } = useHandleSearch();

  return (
    <div className="search-bar">
      <InputField
        type="text"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search for synonyms..."
      />
      <Button onClick={handleSearch} className="button-primary">
        Search
      </Button>
    </div>
  );
}; 