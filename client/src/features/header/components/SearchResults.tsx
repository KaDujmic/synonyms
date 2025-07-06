import type { Synonym } from '../../../types/Synonym.type';
import { useNavigate } from 'react-router-dom';
import { ClickOutsideAwareComponent } from '../../clickOutsideAwareComponent/components/ClickOutsideAwareComponent';

interface SearchResultsProps {
  results: Synonym[];
	setSearchTerm: (term: string) => void;
	setFocused: (focused: boolean) => void;
}

export const SearchResults= (props: SearchResultsProps) => {
	const { 
		results,
		setSearchTerm,
		setFocused
	} = props;
	const navigate = useNavigate();

	const onResultClick = (result: Synonym) => {
		console.log('result', result);
		
		setSearchTerm(result.word);
		setFocused(false);
		navigate(`/synonym/${result.slug}`);
	}
	
  return (
    <div className="search-bar-results">
        {results.map((result, index) => (
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
    </div>
  );
};
