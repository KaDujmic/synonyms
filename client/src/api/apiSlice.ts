import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Synonym } from '../types/Synonym.type';
import type { SynonymClientResponse } from '../types/SynonymClientResponse.type';
import type { CreateSynonymRequest } from '../types/CreateSynonymRequest.type';
import type { SearchSynonymResponse } from './types/SearchSynonymResponse.type';
import type { GetSynonymResponse } from './types/GetSynonymResponse.type';

// API Slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/synonym',
    credentials: 'include'
  }),
  tagTypes: ['Synonyms'],
  endpoints: (builder) => ({
    // GET /synonym/:searchTerm - Get synonyms for a specific word
    getSynonym: builder.query<GetSynonymResponse, string | undefined>({
      query: (searchTerm) => `/${searchTerm}`,
      providesTags: (result, _, searchTerm) => 
        result ? [{ type: 'Synonyms', id: searchTerm }] : []
    }),

    // GET /synonym/search/:searchTerm - Search synonyms starting with prefix
    searchSynonyms: builder.query<SearchSynonymResponse, string>({
      query: (searchTerm) => `/search/${searchTerm}`,
      providesTags: (result, _, searchTerm) => 
        result ? [{ type: 'Synonyms', id: `search-${searchTerm}` }] : []
    }),

    // GET /synonym/:searchTerm/synonyms - Get synonym objects with nested synonyms
    getSynonymObjects: builder.query<SynonymClientResponse, string>({
      query: (searchTerm) => `/${searchTerm}/synonyms`,
      providesTags: (result, _, searchTerm) => 
        result ? [{ type: 'Synonyms', id: `objects-${searchTerm}` }] : []
    }),

    // GET /synonym/:searchTerm/similar - Find similar words
    findSimilarWords: builder.query<Synonym[], { searchTerm: string; maxResults?: number }>({
      query: ({ searchTerm, maxResults = 7 }) => ({
        url: `/${searchTerm}/similar`,
        params: { maxResults }
      }),
      providesTags: (result, _, { searchTerm }) => 
        result ? [{ type: 'Synonyms', id: `similar-${searchTerm}` }] : []
    }),

    // POST /synonym - Create new synonyms
    createSynonym: builder.mutation<GetSynonymResponse, CreateSynonymRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Synonyms']
    }),

    // POST /synonym/:word/add - Add synonyms to an existing word
    addSynonymsToWord: builder.mutation<{ word: string; synonyms: string[] }, { word: string; synonyms: string[] }>({
      query: ({ word, synonyms }) => ({
        url: `/${word}/add`,
        method: 'POST',
        body: { synonyms }
      }),
      invalidatesTags: (_, __, { word }) => [{ type: 'Synonyms', id: word }],
      async onQueryStarted({ word }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          
          // Import and use the cache update hook
          const { updateSynonymCache } = await import('./hooks/useUpdateSynonymCache');
          dispatch(updateSynonymCache(word, response.data.synonyms));
        } catch (error) {
          // Handle error implementation
          console.error('Failed to update getSynonym cache:', error);
        }
      }
    }),

    // GET /synonym/:word/available/:searchTerm - Search for available synonyms for a word
    searchAvailableSynonyms: builder.query<SearchSynonymResponse, { word?: string; searchTerm: string }>({
        query: ({ word, searchTerm }) => {
          // If word is empty or undefined, use the general search endpoint
          if (!word || word.trim() === '') {
            return `/search/${searchTerm}`;
          }
          return `/${word}/available/${searchTerm}`;
        },
        providesTags: (result, _, { word, searchTerm }) => 
          result ? [{ type: 'Synonyms', id: `available-${word}-${searchTerm}` }] : []
    }),
  })
});

// Export hooks for usage in components
export const {
  useGetSynonymQuery,
  useSearchSynonymsQuery,
  useLazySearchSynonymsQuery,
  useGetSynonymObjectsQuery,
  useFindSimilarWordsQuery,
  useCreateSynonymMutation,
  useAddSynonymsToWordMutation,
  useSearchAvailableSynonymsQuery,
  useLazySearchAvailableSynonymsQuery
} = apiSlice;
