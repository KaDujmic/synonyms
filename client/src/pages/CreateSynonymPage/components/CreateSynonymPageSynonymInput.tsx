import { SuggestField } from "../../../features/SuggestField/components/SuggestField";
import type { Synonym } from "../../../types/Synonym.type";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { CreateSynonymPageSynonymList } from "./CreateSynonymPageSynonymList";
import { useTranslations } from "../../../translations/useTranslations";


interface CreateSynonymPageSynonymInputProps {
  currentSynonym: string;
  handleSynonymChange: (value: string) => void;
  addSynonym: (synonym: Synonym) => void;
  setIsFocused: (isFocused: boolean) => void;
  searchResults: Synonym[];
  synonyms: Synonym[];
  removeSynonym: (synonym: string) => void;
  isFocused: boolean;
}

export const CreateSynonymPageSynonymInput = (props: CreateSynonymPageSynonymInputProps) => {
  const { translation } = useTranslations();
  const {
    currentSynonym,
    handleSynonymChange,
    addSynonym,
    setIsFocused,
    searchResults,
    synonyms,
    removeSynonym,
    isFocused
  } = props;

  return (
    <div className="create-synonym-page__synonyms-section">
      <label className="create-synonym-page__label">{translation('createSynonym.synonyms.label')}</label>
      <div className="create-synonym-page__add-synonym">
        <SuggestField
          customButton={
            (currentSynonym.length > 0 && (
              <AddCircleOutlineOutlinedIcon 
                onClick={() => {
                  addSynonym({ word: currentSynonym, synonyms: [], slug: currentSynonym });
                  setIsFocused(false);
                }}
                className="create-synonym-page__add-synonym-btn"
              />
            ))
          }
          value={currentSynonym}
          onChange={handleSynonymChange}
          onSuggestionClick={addSynonym}
          setIsFocused={setIsFocused}
          searchResults={searchResults}
          isFocused={isFocused}
          placeholder={translation('createSynonym.synonyms.placeholder')}
        />
      </div>
      <CreateSynonymPageSynonymList 
        synonyms={synonyms} 
        removeSynonym={removeSynonym} 
      />
    </div>
  )
}