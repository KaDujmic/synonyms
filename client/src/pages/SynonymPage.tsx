import { useParams } from 'react-router-dom';

export const SynonymPage = () => {
  const { searchTerm } = useParams();

  return (
    <div>
      <h1>Hello World - Synonym Page</h1>
      <p>Synonyms for: {searchTerm}</p>
    </div>
  );
}; 