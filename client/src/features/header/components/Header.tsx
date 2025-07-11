import { useMatches, useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import '../styles/header.less';

export const Header = () => {
  const navigate = useNavigate();

  const matches = useMatches();
  const isHomePage = matches[matches.length - 1].id === 'homepage';

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header-logo" onClick={handleLogoClick}>
        <img 
          src="/src/assets/letter-s.svg" 
          alt="logo" 
          className="logo" 
        />
        <h2 className="header-logo-text">Synonyms</h2>
      </div>

      {!isHomePage && (
        <div className="search-container">
          <SearchBar />
        </div>
      )}
    </div>
  );
}; 