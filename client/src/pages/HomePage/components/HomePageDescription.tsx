import { HomePageSection } from "./HomePageSection";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { useNavigate } from "react-router-dom";
import { useTranslations } from "../../../translations/useTranslations";

interface HomePageDescriptionProps {
  refetch: () => void;
}

export const HomePageDescription = ({ refetch }: HomePageDescriptionProps) => {
  const navigate = useNavigate();
  const { translation } = useTranslations();


  return (
    <div className="home-page__hero">
      <h1>{translation('homepage.title')}</h1>
      <p>{translation('homepage.description')}</p>
      <div className="home-page__features">
        <HomePageSection 
          title={translation('homepage.features.smartSearch.title')} 
          description={translation('homepage.features.smartSearch.description')} 
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
          title={translation('homepage.features.addYourOwn.title')} 
          description={translation('homepage.features.addYourOwn.description')} 
          Icon={
            <AddCircleOutlineOutlinedIcon 
              onClick={() => {
                navigate("/synonym/create");
              }} 
            />
          } 
        />
        <HomePageSection 
          title={translation('homepage.features.randomDiscovery.title')} 
          description={translation('homepage.features.randomDiscovery.description')} 
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