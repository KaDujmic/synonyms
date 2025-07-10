import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { MarqueeComponent } from "../../../components/MarqueeComponent";
import type { Synonym } from "../../../types/Synonym.type";

interface CreateSynonymPageSynonymListProps {
  synonyms: Synonym[];
  removeSynonym: (slug: string) => void;
}

export const CreateSynonymPageSynonymList = ({ synonyms, removeSynonym }: CreateSynonymPageSynonymListProps) => {
  return (synonyms.length > 0 && (
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
  ))
}