import { Card } from '../../../components/Card';
import { useCreateSynonym } from '../hooks/useCreateSynonym';
import '../styles/create-synonym-page.less';
import { SynonymCardLoader } from '../../SynonymPage/components/SynonymCardLoader';
import { CreateSynonymPageSynonymInput } from './CreateSynonymPageSynonymInput';
import { CreateSynonymPageHeader } from './CreateSynonymPageHeader';
import { CreateSynonymPageWordInput } from './CreateSynonymPageWordInput';
import { CreateSynonymPageSubmit } from './CreateSynonymPageSubmit';

export const CreateSynonymPage = () => {
  const {
    word,
    synonyms,
    currentSynonym,
    isFocused,
    searchResults,
    isCreating,
    handleWordChange,
    handleSynonymChange,
    addSynonym,
    removeSynonym,
    setIsFocused,
    handleSave
  } = useCreateSynonym();

  if (isCreating) {
    return <SynonymCardLoader/>;
  }
    
  return (
    <div className="create-synonym-page">
      <Card className="create-synonym-page__card">
        <CreateSynonymPageHeader />
        
        <CreateSynonymPageWordInput
          word={word}
          handleWordChange={handleWordChange}
        />

        <CreateSynonymPageSynonymInput
          currentSynonym={currentSynonym}
          handleSynonymChange={handleSynonymChange}
          addSynonym={addSynonym}
          setIsFocused={setIsFocused}
          synonyms={synonyms}
          removeSynonym={removeSynonym}
          isFocused={isFocused}
          searchResults={searchResults}
        />

        <CreateSynonymPageSubmit
          handleSave={handleSave}
          word={word}
          synonyms={synonyms}
          isCreating={isCreating}
        />
      </Card>
    </div>
  );
}; 