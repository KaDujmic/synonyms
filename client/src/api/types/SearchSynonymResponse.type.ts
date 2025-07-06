import type { Synonym } from "../../types/Synonym.type";

export type SearchSynonymResponse = {
  status: string;
  data: {
    synonyms: Synonym[];
  };
};