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
      providesTags: (result, error, searchTerm) => 
        result ? [{ type: 'Synonyms', id: searchTerm }] : []
    }),

    // GET /synonym/search/:searchTerm - Search synonyms starting with prefix
    searchSynonyms: builder.query<SearchSynonymResponse, string>({
      query: (searchTerm) => `/search/${searchTerm}`,
      providesTags: (result, error, searchTerm) => 
        result ? [{ type: 'Synonyms', id: `search-${searchTerm}` }] : []
    }),

    // GET /synonym/:searchTerm/synonyms - Get synonym objects with nested synonyms
    getSynonymObjects: builder.query<SynonymClientResponse, string>({
      query: (searchTerm) => `/${searchTerm}/synonyms`,
      providesTags: (result, error, searchTerm) => 
        result ? [{ type: 'Synonyms', id: `objects-${searchTerm}` }] : []
    }),

    // GET /synonym/:searchTerm/similar - Find similar words
    findSimilarWords: builder.query<Synonym[], { searchTerm: string; maxResults?: number }>({
      query: ({ searchTerm, maxResults = 7 }) => ({
        url: `/${searchTerm}/similar`,
        params: { maxResults }
      }),
      providesTags: (result, error, { searchTerm }) => 
        result ? [{ type: 'Synonyms', id: `similar-${searchTerm}` }] : []
    }),

    // POST /synonym - Create new synonyms
    createSynonym: builder.mutation<{ word: string; synonyms: string[] }, CreateSynonymRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Synonyms']
    })
  })
});

// Export hooks for usage in components
export const {
  useGetSynonymQuery,
  useSearchSynonymsQuery,
  useLazySearchSynonymsQuery,
  useGetSynonymObjectsQuery,
  useFindSimilarWordsQuery,
  useCreateSynonymMutation
} = apiSlice;
