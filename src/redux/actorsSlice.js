import { createSlice } from "@reduxjs/toolkit";

const actorsSlice = createSlice({
  name: "actors",
  initialState: {
    actors: [],
    isLoading: false,
    error: null,
    totalPages: 0,
    isEmpty: false,
  },
  reducers: {
    setActors(state, action) {
      state.actors = action.payload;
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

export const { setActors, setIsLoading, setError, setTotalPages, setIsEmpty } =
  actorsSlice.actions;
export const actorsReducer = actorsSlice.reducer;
