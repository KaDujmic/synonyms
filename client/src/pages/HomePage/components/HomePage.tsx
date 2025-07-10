import { useGetRandomSynonymQuery } from "../../../api/apiSlice";
import { SearchBar } from "../../../features/Header/components/SearchBar";
import { HomePageDescription } from "./HomePageDescription";
import { SynonymCard } from "../../SynonymPage/components/SynonymCard";
import { SynonymCardLoader } from "../../SynonymPage/components/SynonymCardLoader";
import '../styles/homepage.less';


export const HomePage = () => {
  const { data: randomSynonym, isLoading, refetch } = useGetRandomSynonymQuery();

  return (
    <>
        <SearchBar />
        <HomePageDescription refetch={refetch} />
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