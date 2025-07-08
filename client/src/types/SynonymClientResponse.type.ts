import type { Synonym } from './Synonym.type';
 
export type SynonymClientResponse = {
  status: string;
  data: {
    word: string;
    synonyms: Synonym[];
  };
}; 