import { useParams } from 'react-router-dom';
import { useGetSynonymQuery } from '../../api/apiSlice';
import { Card } from '../../components/Card';
import './styles/synonym-page.less';

export const SynonymPage = () => {
  const { searchTerm } = useParams();
  const { data: synonym } = useGetSynonymQuery(searchTerm);

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
          {synonym?.data?.synonyms.map((synonym) => (
            <div 
              className="synonym-card__synonyms-word"
                key={synonym.slug}
            >
              {synonym.word}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}; 