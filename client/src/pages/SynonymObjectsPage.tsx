import { useParams } from 'react-router-dom';

export const SynonymObjectsPage = () => {
  const { searchTerm } = useParams();

  return (
    <div>
      <h1>Hello World - Synonym Objects Page</h1>
      <p>Synonym objects for: {searchTerm}</p>
    </div>
  );
}; 