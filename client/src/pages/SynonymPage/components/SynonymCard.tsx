import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import type { Synonym } from "../../../types/Synonym.type";
import { LoadingSkeleton } from '../../../components/LoadingSkeleton';
import { Card } from '../../../components/Card';

interface SynonymCardProps {
	searchTerm?: string;
	synonyms: Synonym[];
	isAdding: boolean;
	handleAddClick?: () => void;
	isLoadingAddSynonym: boolean;
	children?: React.ReactNode;
}

export const SynonymCard = (props: SynonymCardProps) => {
    const {
        searchTerm,
        synonyms,
        isAdding,
        handleAddClick,
        isLoadingAddSynonym,
				children,
    } = props;

    return (
			<Card className="synonym-card">
				<div className="synonym-card__title">
					{searchTerm}
				</div>
				<hr/>
				<div className="synonym-card__subtitle">
					synonyms
				</div>
				<div className="synonym-card__synonyms">
					{synonyms?.map((synonym: Synonym) => (
						<div 
							className="synonym-card__synonyms-word"
							key={synonym.slug}
						>
							{synonym.word}
						</div>
					))}
					{isLoadingAddSynonym && (
						<LoadingSkeleton width="100%" height="32px" variant="gray" />
					)}
					{!isAdding && handleAddClick && !isLoadingAddSynonym && (
						<div className="synonym-card__synonyms-add" onClick={handleAddClick}>
							<AddCircleOutlineOutlinedIcon />
						</div>
					)}
				</div>
				{children}
			</Card>
    )
}