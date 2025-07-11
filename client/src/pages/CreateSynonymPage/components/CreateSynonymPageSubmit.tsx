import { Button } from "../../../components/Button"
import type { Synonym } from "../../../types/Synonym.type"
import { useTranslations } from "../../../translations/useTranslations";

interface CreateSynonymPageSubmitProps {
  handleSave: () => void;
  word: string;
  synonyms: Synonym[];
  isCreating: boolean;
}

export const CreateSynonymPageSubmit = (props: CreateSynonymPageSubmitProps) => {
  const { translation } = useTranslations();
  const {
    handleSave,
    word,
    synonyms,
    isCreating
  } = props;

  return (
    <div className="create-synonym-page__actions">
      <Button
        onClick={handleSave}
        className="create-synonym-page__save-btn"
        // Validation could be done through the hook, but since it is very simple
        // I will do it here with the disabled prop :)
        disabled={!word.trim() || synonyms.length === 0 || isCreating}
      >
        {translation('createSynonym.submit.button')}
      </Button>
    </div>
  )
}