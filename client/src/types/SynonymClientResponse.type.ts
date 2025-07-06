import type { Synonym } from './Synonym.type';

export type SynonymClientResponse = {
  word: string;
  synonyms: Synonym[];
}; 