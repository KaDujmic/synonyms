import { Synonym } from "@/types/Synonym.type";

export type GetSynonymResponse = {
  data: {
    word: string;
    slug: string;
    synonyms: Synonym[];
  };
  message: string;
}