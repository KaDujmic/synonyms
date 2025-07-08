import { useGetSynonymQuery } from '../../api/apiSlice';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { useAddSynonym } from './hooks/useAddSynonym';
import './styles/synonym-page.less';
import { AddNewSynonym } from './features/AddNewSynonym/components/AddNewSynonym';
import { SynonymCard } from './components/SynonymCard';
import { SynonymCardLoader } from './components/SynonymCardLoader';

export const SynonymPage = () => {
  const { searchTerm } = useParams();
  const { data: synonym, isLoading } = useGetSynonymQuery(searchTerm);
  const {
    isAdding,
    newSynonym,
    searchResults,
    handleAddClick,
    handleCancel,
    handleInputChange,
    handleSave,
    isFocused,
    setIsFocused,
    isLoading: isLoadingAddSynonym,
  } = useAddSynonym();

  if (isLoading) {
    return <SynonymCardLoader />;
  }
  
  return (
    <div className="synonym">
      <SynonymCard
        searchTerm={searchTerm}
        synonyms={synonym?.data?.synonyms || []}
        isAdding={isAdding}
        handleAddClick={handleAddClick}
        isLoadingAddSynonym={isLoadingAddSynonym}
      >
        {isAdding && (
          <AddNewSynonym
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleInputChange={handleInputChange}
            isFocused={isFocused}
            setIsFocused={setIsFocused}
            newSynonym={newSynonym}
            searchResults={searchResults}
          />
        )}
      </SynonymCard>
    </div>
  );
}; 