import { useGetSynonymQuery } from '../../../api/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddSynonym } from '../hooks/useAddSynonym';
import '../styles/synonym-page.less';
import { AddNewSynonym } from '../features/AddNewSynonym/components/AddNewSynonym';
import { SynonymCard } from './SynonymCard';
import { SynonymCardLoader } from './SynonymCardLoader';
import { useSynonym } from '../hooks/useSynonym';

export const SynonymPage = () => {
  const { 
    synonym, 
    isLoading,
    searchTerm,
  } = useSynonym();

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
    isLoadingAddSynonym,
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