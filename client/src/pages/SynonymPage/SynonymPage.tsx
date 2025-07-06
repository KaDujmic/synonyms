import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useGetSynonymQuery } from '../../api/apiSlice';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { ClickOutsideAwareComponent } from '../../features/clickOutsideAwareComponent/components/ClickOutsideAwareComponent';
import { useAddSynonym } from './hooks/useAddSynonym';
import './styles/synonym-page.less';

export const SynonymPage = () => {
  const { searchTerm } = useParams();
  const { data: synonym } = useGetSynonymQuery(searchTerm);
  const {
    isAdding,
    newSynonym,
    searchResults,
    handleAddClick,
    handleCancel,
    handleInputChange,
    handleSave,
    isFocused,
    setIsFocused
  } = useAddSynonym();

  console.log('synonym', synonym?.data?.synonyms);
  
  return (
    <div className="synonym">
      <Card className="synonym-card">
        <div className="synonym-card__title">
          {searchTerm}
        </div>
        <hr/>
        <div className="synonym-card__subtitle">
          synonyms
        </div>
        <div className="synonym-card__synonyms">
          {synonym?.data?.synonyms?.map((synonym) => (
            <div 
              className="synonym-card__synonyms-word"
              key={synonym.slug}
            >
              {synonym.word}
            </div>
          ))}
          {!isAdding && (
            <div className="synonym-card__synonyms-add" onClick={handleAddClick}>
              <AddCircleOutlineOutlinedIcon />
            </div>
          )}
        </div>
        {isAdding && (
          <div className="synonym-card__synonyms-input">
            <ClickOutsideAwareComponent 
              onOutsideClick={() => setIsFocused(false)}
              className="synonym-card__synonyms-input-field"
            >
              <InputField
                value={newSynonym}
                onChange={handleInputChange}
                placeholder="Type a synonym..."
                autoFocus
                onFocus={() => setIsFocused(true)}
              />
              {newSynonym.length > 0 && searchResults.length > 0 && isFocused && (
                <div className="synonym-card__synonyms-suggestions">
                  {searchResults.map((result) => (
                    <div
                      key={result.slug}
                      className="synonym-card__synonyms-suggestion"
                      onClick={() => handleInputChange(result.word, true)}
                    >
                      {result.word}
                    </div>
                  ))}
                </div>
              )}
            </ClickOutsideAwareComponent>
            <div className="synonym-card__synonyms-actions">
              <Button onClick={handleSave} className="button-primary">
                Save
              </Button>
              <Button onClick={handleCancel} className="button-secondary">
                Cancel
              </Button>
            </div>
          </div>
          )}
      </Card>
    </div>
  );
}; 