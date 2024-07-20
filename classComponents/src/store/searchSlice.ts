import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiResponse, Result } from '../interfaces';

export interface SearchState {
  query: string;
  results: Result[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
  totalResults: 0,
  currentPage: 1,
};

export const fetchResultsExtra = createAsyncThunk(
  'search/fetchResultsExtra',
  async (params: { query: string; page: number }) => {
    const response = await fetch(`https://swapi.dev/api/people/?search=${params.query.trim()}&page=${params.page}`);
    const data: ApiResponse = await response.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResultsExtra.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResultsExtra.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.totalResults = action.payload.count;
      })
      .addCase(fetchResultsExtra.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch results';
      });
  },
});

export const { setQuery, setPage } = searchSlice.actions;
export default searchSlice.reducer;