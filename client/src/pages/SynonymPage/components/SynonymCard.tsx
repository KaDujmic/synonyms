import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import type { Synonym } from "../../../types/Synonym.type";

interface SynonymCardProps {
    searchTerm?: string;
    synonyms: Synonym[];
    isAdding: boolean;
    handleAddClick: () => void;
}

export const SynonymCard = (props: SynonymCardProps) => {
    const {
        searchTerm,
        synonyms,
        isAdding,
        handleAddClick,
    } = props;
    return (
			<>
				<div className="synonym-card__title">
					{searchTerm}
				</div>
				<hr/>
				<div className="synonym-card__subtitle">
					synonyms
				</div>
				<div className="synonym-card__synonyms">
					{synonyms?.map((synonym) => (
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
			</>
    )
}