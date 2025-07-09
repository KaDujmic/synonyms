import { SuggestField } from "../../../features/SuggestField/components/SuggestField";
import { MarqueeComponent } from "../../../components/MarqueeComponent";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import type { Synonym } from "../../../types/Synonym.type";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


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
      <label className="create-synonym-page__label">Synonyms:</label>
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
          placeholder="Type a synonym..."
        />
      </div>
      
      {synonyms.length > 0 && (
        <div className="create-synonym-page__synonyms-list">
          {synonyms.map((synonym) => (
            <div key={synonym.slug} className="create-synonym-page__synonym-item">
              <span>{synonym.word}</span>
              <MarqueeComponent 
                className="create-synonym-page__synonym-synonyms" 
                speed={20}
              >
                {synonym.synonyms?.map((synonym) => synonym.word).join(', ')}
              </MarqueeComponent>
              <CancelOutlinedIcon 
                onClick={() => removeSynonym(synonym.slug)}
                className="create-synonym-page__remove-btn"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}