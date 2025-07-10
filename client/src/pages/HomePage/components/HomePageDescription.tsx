import { HomePageSection } from "./HomePageSection";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useNavigate } from "react-router-dom";

interface HomePageDescriptionProps {
  refetch: () => void;
}

export const HomePageDescription = ({ refetch }: HomePageDescriptionProps) => {
  const navigate = useNavigate();


  return (
    <div className="home-page__hero">
      <h1>Your Ultimate Synonym Companion</h1>
      <p>Search, discover, and create connections between words. Whether you're writing, learning, or just curious, find the right synonym to enhance your communication.</p>
      <div className="home-page__features">
        <HomePageSection 
          title="Smart Search" 
          description="Find synonyms instantly with our intelligent search" 
          Icon={<SearchOutlinedIcon 
            onClick={() => {
              const searchInput = document.getElementById('search-bar-input') as HTMLInputElement;
              if (searchInput) {
                searchInput.focus();
              }
            }}
          />} 
        />
        <HomePageSection 
          title="Add Your Own" 
          description="Contribute to our growing database of word relationships" 
          Icon={
            <AddCircleOutlineOutlinedIcon 
              onClick={() => {
                navigate("/synonym/create");
              }} 
            />
          } 
        />
        <HomePageSection 
          title="Random Discovery" 
          description="Explore new words and expand your vocabulary" 
          Icon={
            <ReplayOutlinedIcon 
              onClick={() => {
                refetch();
              }} 
            />
          } 
        />
      </div>
    </div>
  )
}