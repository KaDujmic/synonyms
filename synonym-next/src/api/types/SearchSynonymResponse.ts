import { Synonym } from "@/types/Synonym.type";

export type SearchSynonymResponse = {
  data: {
    searchTerm: string;
    synonyms: Synonym[];
  };
  message: string;
}