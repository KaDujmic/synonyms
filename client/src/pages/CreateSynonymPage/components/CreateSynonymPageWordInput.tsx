import { InputField } from "../../../components/InputField";
import { useTranslations } from "../../../translations/useTranslations";

interface CreateSynonymPageWordInputProps {
  word: string;
  handleWordChange: (value: string) => void;
}

export const CreateSynonymPageWordInput = (props: CreateSynonymPageWordInputProps) => {
  const { translation } = useTranslations();
  const { word, handleWordChange } = props;
  return (
    <>
      <label className="create-synonym-page__label">{translation('createSynonym.word.label')}</label>
      <div className="create-synonym-page__word-section">
        <InputField
          value={word}
          onChange={handleWordChange}
          placeholder={translation('createSynonym.word.placeholder')}
          className="create-synonym-page__word-input"
        />
      </div>
    </>
  )
}