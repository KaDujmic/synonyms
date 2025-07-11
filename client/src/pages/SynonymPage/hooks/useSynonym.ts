import { useNavigate, useParams } from "react-router-dom";
import { useLazyGetSynonymQuery } from "../../../api/apiSlice";
import { useEffect } from "react";

export const useSynonym = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [getSynonym, { data: synonym, isLoading, isError, isUninitialized }] = useLazyGetSynonymQuery();

  useEffect(() => {
    if (searchTerm) {
      getSynonym(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (isError && !isLoading && !isUninitialized) {
      navigate(`/synonym/create?word=${searchTerm}`, { replace: true });
    }
  }, [isError, isLoading, isUninitialized]);

  return {
    synonym: synonym,
    isLoading,
    searchTerm,
  }
}