import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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
  tagTypes: ['Synonyms', 'Synonym'],
  endpoints: (builder) => ({
    // GET /synonym/:searchTerm - Get synonyms for a specific word
    getSynonym: builder.query<GetSynonymResponse, string | undefined>({
      query: (searchTerm) => `/${searchTerm}`,
      providesTags: (result, _, searchTerm) => 
        result ? [{ type: 'Synonym', id: searchTerm }] : []
    }),

    // GET /synonym/search/:searchTerm - Search synonyms starting with prefix
    searchSynonyms: builder.query<SearchSynonymResponse, string>({
      query: (searchTerm) => `/search/${searchTerm}`,
      providesTags: (result, _, searchTerm) => 
        result ? [{ type: 'Synonyms', id: `search-${searchTerm}` }] : []
    }),

    // POST /synonym - Create new synonyms
    createSynonym: builder.mutation<GetSynonymResponse, CreateSynonymRequest>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body
      }),
      async onQueryStarted({ word }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          
          // Force a refetch of the getSynonym query for this word
          dispatch(apiSlice.util.invalidateTags([{ type: 'Synonyms', id: word }]));
        } catch (error) {
          // Handle error implementation
          console.error('Failed to update getSynonym cache:', error);
        }
      },
      invalidatesTags: ['Synonyms']
    }),

    // POST /synonym/:word/add - Add synonyms to an existing word
    addSynonymsToWord: builder.mutation<SynonymClientResponse, { word: string; synonyms: string[] }>({
      query: ({ word, synonyms }) => ({
        url: `/${word}/add`,
        method: 'POST',
        body: { synonyms }
      }),
      async onQueryStarted({ word }, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          
          // Import and use the cache update hook
          const { updateSynonymCache } = await import('./hooks/useUpdateSynonymCache');
          dispatch(updateSynonymCache(word, response.data.data.synonyms));
        } catch (error) {
          // Handle error implementation
          console.error('Failed to update getSynonym cache:', error);
        }
      }
    }),

    // GET /synonym/random - Get a random word from the synonym database
    getRandomSynonym: builder.query<SynonymClientResponse, void>({
      query: () => '/random',
      providesTags: () => [{ type: 'Synonyms', id: 'random' }]
    }),
  })
});

// Export hooks for usage in components
export const {
  useGetSynonymQuery,
  useLazyGetSynonymQuery,
  useSearchSynonymsQuery,
  useLazySearchSynonymsQuery,
  useCreateSynonymMutation,
  useAddSynonymsToWordMutation,
  useGetRandomSynonymQuery
} = apiSlice;
