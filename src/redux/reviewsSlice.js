import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setReviews, setIsLoading, setError } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
