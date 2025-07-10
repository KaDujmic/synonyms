import type { Synonym } from '../../types/Synonym.type';
import { apiSlice } from '../apiSlice';

export const updateSynonymCache = (word: string, newSynonyms: Synonym[]) => {
  return apiSlice.util.updateQueryData(
    'getSynonym',
    word,
    (draft) => {
      if (draft && draft.data && draft.data.synonyms) {
        // Add the new synonyms to the existing list
        const newSynonymsObjects = newSynonyms.map(synonym => ({
          word: synonym.word,
          slug: synonym.slug,
          synonyms: synonym.synonyms
        }));
        
        draft.data.synonyms = [...newSynonymsObjects];
      }
    }
  );
};

export const useUpdateSynonymCache = () => {
  return { updateSynonymCache };
}; 