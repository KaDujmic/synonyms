import { apiSlice } from '../apiSlice';

export const updateSynonymCache = (word: string, newSynonyms: string[]) => {
  return apiSlice.util.updateQueryData(
    'getSynonym',
    word,
    (draft) => {
      if (draft && draft.data && draft.data.synonyms) {
        // Add the new synonyms to the existing list
        const newSynonymsObjects = newSynonyms.map(synonym => ({
          word: synonym,
          slug: synonym.toLowerCase()
        }));
        
        draft.data.synonyms = [...draft.data.synonyms, ...newSynonymsObjects];
      }
    }
  );
};

export const useUpdateSynonymCache = () => {
  return { updateSynonymCache };
}; 