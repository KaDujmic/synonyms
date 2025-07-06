import { useParams } from 'react-router-dom';

export const SearchSynonymsPage = () => {
  const { searchTerm } = useParams();

  return (
    <div>
      <h1>Hello World - Search Synonyms Page</h1>
      <p>Searching for synonyms starting with: {searchTerm}</p>
    </div>
  );
}; 