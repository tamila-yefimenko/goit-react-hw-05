import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesHome: [],
    moviesSearch: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    isEmpty: false,
  },
  reducers: {
    setMovies(state, action) {
      state.moviesHome.push(...action.payload);
    },
    // setMoviesSearch(state, action) {
    //   if (action.payload.length === 0) {
    //     state.moviesSearch = action.payload;
    //     return;
    //   }
    //   state.moviesSearch.push(...action.payload);
    // },
    setMoviesSearch(state, action) {
      state.moviesSearch = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setIsEmpty(state, action) {
      state.isEmpty = action.payload;
    },
  },
});

export const {
  setMovies,
  setMoviesSearch,
  setIsLoading,
  setError,
  setTotalPages,
  setIsEmpty,
} = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
