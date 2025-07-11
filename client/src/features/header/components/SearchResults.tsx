import type { Synonym } from '../../../types/Synonym.type';
import { useNavigate } from 'react-router-dom';
import { useTranslations } from '../../../translations/useTranslations';

interface SearchResultsProps {
  results: Synonym[];
	setSearchTerm: (term: string) => void;
	setFocused: (focused: boolean) => void;
	searchTerm: string;
	isLoading: boolean;
}

export const SearchResults= (props: SearchResultsProps) => {
	const { 
		results,
		setSearchTerm,
		setFocused,
		searchTerm,
		isLoading
	} = props;
	const navigate = useNavigate();
	const { translation } = useTranslations();

	const onResultClick = (result: Synonym) => {		
		setSearchTerm(result.word);
		setFocused(false);
		navigate(`/synonym/${result.slug}`);
	}

	const hasExactMatch = results.some(result => result.word.toLowerCase() === searchTerm.toLowerCase());

  return (
    <div className="search-bar-results">
			{searchTerm.length === 0 && !isLoading && (
				<div
					onClick={() => {
						navigate(`/synonym/create`);
					}}
				>
					{translation('search.results.createNewSynonym')}
				</div>
			)}
			{searchTerm.length > 0 && results.map((result, index) => (
				<div
					key={`${result.slug}-${index}`}
					onClick={() => {
						onResultClick(result);
					}}
					className="search-result-item"
				>
					{result.word}
				</div>
			))}
			{!hasExactMatch && searchTerm.length > 0 && !isLoading && (
				<div
					onClick={() => {
						navigate(`/synonym/create?word=${searchTerm}`);
					}}
				>
					{translation('search.results.createNewSynonymFor')} <b>{searchTerm}</b>?
				</div>
			)}
    </div>
  );
};
