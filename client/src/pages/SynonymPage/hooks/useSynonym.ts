import { useNavigate, useParams } from "react-router-dom";
import { useGetSynonymQuery } from "../../../api/apiSlice";
import { useEffect } from "react";

export const useSynonym = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const { data: synonym, isLoading, isError } = useGetSynonymQuery(searchTerm || "");

  useEffect(() => {
    if (isError) {
      navigate(`/synonym/create?word=${searchTerm}`, { replace: true });
    }
  }, [isError]);

  return {
    synonym: synonym,
    isLoading,
    searchTerm,
  }
}