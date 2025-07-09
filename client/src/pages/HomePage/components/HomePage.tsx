import { SearchBar } from "../../../features/Header/components/SearchBar";
import { useGetRandomSynonymQuery } from "../../../api/apiSlice";
import { SynonymCard } from "../../SynonymPage/components/SynonymCard";
import { SynonymCardLoader } from "../../SynonymPage/components/SynonymCardLoader";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


export const HomePage = () => {
  const { data: randomSynonym, isLoading } = useGetRandomSynonymQuery();
  const navigate = useNavigate();

  return (
    <>
        <SearchBar />
        <div className="home-page__hero">
          <h1>Your Ultimate Synonym Companion</h1>
          <p>Search, discover, and create connections between words. Whether you're writing, learning, or just curious, find the right synonym to enhance your communication.</p>
          <div className="home-page__features">
            <div className="feature">
              <h3>Smart Search</h3>
              <p>Find synonyms instantly with our intelligent search</p>
            </div>
            <div className="feature">
              <h3 onClick={() => {
                navigate("/synonym/create");
              }}><AddCircleOutlineOutlinedIcon /> Add Your Own</h3>
              <p>Contribute to our growing database of word relationships</p>
            </div>
            <div className="feature">
              <h3>Random Discovery</h3>
              <p>Explore new words and expand your vocabulary</p>
            </div>
          </div>
        </div>
        {isLoading && (
          <SynonymCardLoader />
        )}
        {!isLoading && randomSynonym && (
          <SynonymCard 
            synonyms={randomSynonym?.data?.synonyms} 
            isAdding={false} 
            isLoadingAddSynonym={false} 
            searchTerm={randomSynonym?.data?.word}
          />
        )}
    </>
  );
}; 