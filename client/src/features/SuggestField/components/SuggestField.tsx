import { InputField } from '../../../components/InputField';
import { ClickOutsideAwareComponent } from '../../ClickOutsideAwareComponent/components/ClickOutsideAwareComponent';
import '../styles/suggest-field.less';

interface SuggestFieldProps {
  value: string;
  onChange: (value: string) => void;
  setIsFocused: (focused: boolean) => void;
  searchResults: any[];
  isFocused: boolean;
  placeholder?: string;
  onSuggestionClick: (suggestion: any, closeSuggestions?: boolean) => void;
  customButton?: React.ReactNode;
}

export const SuggestField = (props: SuggestFieldProps) => {
  const {
    value,
    onChange,
    setIsFocused,
    searchResults,
    isFocused,
    placeholder = "Type a synonym...",
    onSuggestionClick,
    customButton
  } = props;

  return (
    <div className="suggest-field">
      <ClickOutsideAwareComponent 
        onOutsideClick={() => setIsFocused(false)}
        className="suggest-field__input-field"
      >
        <InputField
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
        />
        {customButton}
        {value.length > 0 && searchResults.length > 0 && isFocused && (
          <div className="suggest-field__suggestions">
            {searchResults.map((result) => (
              <div
                key={result.slug}
                className="suggest-field__suggestion"
                onClick={() => onSuggestionClick(result, true)}
              >
                {result.word}
              </div>
            ))}
          </div>
        )}
      </ClickOutsideAwareComponent>
    </div>
  )
}