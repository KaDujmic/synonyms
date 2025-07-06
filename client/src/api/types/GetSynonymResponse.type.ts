import type { Synonym } from "../../types/Synonym.type";

export type GetSynonymResponse = {
  status: string;
  data: {
    word: string;
    synonyms: Synonym[];
  };
};