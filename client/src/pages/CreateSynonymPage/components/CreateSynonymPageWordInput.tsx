import { InputField } from "../../../components/InputField";

interface CreateSynonymPageWordInputProps {
  word: string;
  handleWordChange: (value: string) => void;
}

export const CreateSynonymPageWordInput = (props: CreateSynonymPageWordInputProps) => {
  const { word, handleWordChange } = props;
  return (
    <>
      <label className="create-synonym-page__label">Word:</label>
        <div className="create-synonym-page__word-section">
          <InputField
            value={word}
            onChange={handleWordChange}
            placeholder="Type a word to create synonyms for..."
            className="create-synonym-page__word-input"
          />
        </div>
    </>
  )
}