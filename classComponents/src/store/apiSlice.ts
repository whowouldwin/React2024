import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, Detail} from '../interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    searchPeople: builder.query<ApiResponse, { query: string; page: number }>({
      query: ({ query, page }) => `people/?search=${query.trim()}&page=${page}`,
    }),
    getPersonDetails: builder.query<Detail, string>({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const { useSearchPeopleQuery, useGetPersonDetailsQuery } = apiSlice;